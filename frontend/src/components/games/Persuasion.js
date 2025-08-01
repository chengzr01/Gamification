import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import users from '../../data/users';
import Rules from './Rules';
import Chats from './Chats';
import GameAnalysis from './Analysis';
// Import shared game styles
import './gameStyles.css';

/**
 * Persuasion game component
 *
 * Implements a simple turn‑based persuasion game between a sender and
 * receiver.  The component manages the game state, the game
 * context (containing case details and legal question) and timing
 * information.  When the game terminates the user statistics are
 * updated in memory and an analysis view is presented.
 *
 * Props:
 *   - caseData: the court case selected by the user.  The caseData
 *     object should contain at least an `id`, `facts`, `legalQuestion`,
 *     and `advocateResponse` field.
 */
export default function Persuasion({ caseData }) {
  const { userId } = useContext(AuthContext);
  // Track the game state: termination, scores and transcript
  const [gameState, setGameState] = useState({
    isTerminated: false,
    senderPayoff: 0,
    receiverPayoff: 0,
    transcript: [],
  });
  // Initialise the game context using the supplied case data.  The
  // justice model is set to the case title by default but can be
  // modified in the Rules component.
  const [gameContext, setGameContext] = useState({
    caseDetails: caseData?.facts ?? '',
    legalQuestion: caseData?.legalQuestion ?? '',
    justiceModel: caseData?.title ?? '',
    advocateResponse: caseData?.advocateResponse ?? '',
  });
  // Record the start time of the game for average time calculations
  const [startTime] = useState(Date.now());

  /**
   * Update the logged in user's statistics when the game ends.  A new
   * stat entry is appended to the user's stats array.  At this time
   * win/draw/loss determination is simplistic: if the sender's payoff
   * exceeds the receiver's payoff we credit a win, if it is less
   * credit a loss, and if equal credit a draw.  Average time is
   * computed as the difference between now and startTime in seconds.
   */
  /**
   * Call an external large‑language model (LLM) to judge the completed
   * conversation.  The LLM is asked to determine who won (the user
   * advocate or the opposing counsel) and to provide scores on eight
   * axes reflecting legal argumentation skills.  A JSON response is
   * expected via the OpenAI API with keys "winner" and "scores".
   * If the call fails or the response cannot be parsed, null is
   * returned and fallback values are used.
   *
   * @param {Object} state - the game state containing transcript
   * @param {Object} context - the game context containing case details
   * @returns {Promise<{winner: string, scores: Object}>|null}
   */
  const judgeConversation = async (state, context) => {
    // Flatten the transcript into a string for the LLM.  Each entry
    // contains a role ("user" or "judge") and the message content.
    const transcriptStr = state.transcript
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n');
    // Build the system and user prompts.  We instruct the model to
    // produce a JSON object with specific keys using constrained
    // decoding.  See docs: https://platform.openai.com/docs/guides/text-generation/json-mode
    const messages = [
      {
        role: 'system',
        content:
          'You are an impartial judge evaluating a mock oral argument.  ' +
          'Given the conversation transcript between an advocate and a panel of judges, you must decide whether the advocate won the argument.  ' +
          'You must also assign scores between 0 and 1 on eight metrics: ' +
          'precedentMastery, logicalCoherence, evidenceIntegration, counterArgumentHandling, ' +
          'responsivenessToJudges, adaptability, clarityAndRhetoricalForce, civilityProfessionalism.  ' +
          'Higher scores indicate better performance.  ' +
          'Return your judgement strictly as a JSON object with two top‑level keys: "winner" and "scores".  ' +
          'The "winner" value must be "user" if the advocate wins, "opponent" if the opposing side wins, or "draw" if neither clearly wins.  ' +
          'The "scores" value must be an object mapping the eight metric names to numerical scores in the [0,1] range.  ' +
          'Do not include any additional keys or comments.',
      },
      {
        role: 'user',
        content:
          `Transcript:\n${transcriptStr}\n\n` +
          `Case question: ${context.legalQuestion}\n\n` +
          'Please evaluate the advocate\'s performance and produce the JSON judgement.',
      },
    ];
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // API key should be supplied via an environment variable named
          // REACT_APP_OPENAI_API_KEY during build time.  Do not commit
          // secrets to version control.
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY ?? ''}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages,
          temperature: 0,
          response_format: { type: 'json_object' },
        }),
      });
      if (!response.ok) {
        console.warn('LLM judge API returned non‑200 status:', response.status);
        return null;
      }
      const data = await response.json();
      // The content should already be JSON due to response_format; however,
      // some models return a stringified JSON.  Attempt to parse safely.
      const raw = data.choices?.[0]?.message?.content;
      if (!raw) return null;
      const judgement = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return judgement;
    } catch (err) {
      // Log errors but do not crash the app
      console.error('Error while calling LLM judge:', err);
      return null;
    }
  };

  const updateUserStats = async (judgement) => {
    if (!userId) return;
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    // default result and scores
    let result = 'draw';
    let scores = {
      precedentMastery: 0.5,
      logicalCoherence: 0.5,
      evidenceIntegration: 0.5,
      counterArgumentHandling: 0.5,
      responsivenessToJudges: 0.5,
      adaptability: 0.5,
      clarityAndRhetoricalForce: 0.5,
      civilityProfessionalism: 0.5,
    };
    if (judgement) {
      // Map LLM winner output to our result labels
      if (judgement.winner) {
        result =
          judgement.winner === 'user'
            ? 'win'
            : judgement.winner === 'opponent'
            ? 'loss'
            : 'draw';
      }
      if (judgement.scores) {
        scores = { ...scores, ...judgement.scores };
      }
    }
    const wins = result === 'win' ? 1 : 0;
    const draws = result === 'draw' ? 1 : 0;
    const losses = result === 'loss' ? 1 : 0;
    const newStat = {
      model: 'Persuasion',
      caseId: caseData.id,
      wins,
      draws,
      losses,
      avg_time: elapsedSeconds,
      win_rate: wins, // when wins=1 win_rate=1 else 0
      scores,
    };
    if (!Array.isArray(user.stats)) {
      user.stats = [];
    }
    user.stats.push(newStat);
  };

  // When the game reaches a terminal state, call the LLM judge,
  // store the judgement in state, and update user statistics.  We
  // wrap this logic in an async IIFE to avoid returning a promise
  // directly from useEffect.
  useEffect(() => {
    if (gameState.isTerminated) {
      (async () => {
        // Obtain the LLM judgement
        const judgement = await judgeConversation(gameState, gameContext);
        if (judgement) {
          // Persist the judgement into the game state so that
          // downstream components (like GameAnalysis) can display it.
          setGameState((prev) => ({ ...prev, judgement }));
        }
        // Update user statistics based on this judgement
        await updateUserStats(judgement);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isTerminated]);

  return (
    <div className="persuasion-game">
      {!gameState.isTerminated ? (
        <>
          {/* Rules allow the user to adjust context but are initialised
              with the case details. */}
          <Rules
            gameState={gameState}
            setGameState={setGameState}
            gameContext={gameContext}
            setGameContext={setGameContext}
          />
          {/* Chats drives the turn‑based interaction */}
          <Chats
            gameState={gameState}
            setGameState={setGameState}
            gameContext={gameContext}
            setGameContext={setGameContext}
          />
        </>
      ) : (
        <GameAnalysis
          transcript={gameState.transcript}
          gameState={gameState}
          gameContext={gameContext}
        />
      )}
    </div>
  );
}