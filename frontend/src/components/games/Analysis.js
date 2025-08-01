import React from 'react';

/**
 * GameStatistics component
 *
 * Provides simple counts of the messages exchanged by each role in
 * the transcript.  The transcript is expected to be an array of
 * objects with a `role` property equal to either "sender" or
 * "receiver".
 */
const GameStatistics = ({ transcript }) => (
  <div className="game-statistics" style={{ marginBottom: '1rem' }}>
    <h3>Game Statistics</h3>
    <p>Total Exchanges: {transcript.length}</p>
    <p>Sender Messages: {transcript.filter((msg) => msg.role === 'sender').length}</p>
    <p>Receiver Messages: {transcript.filter((msg) => msg.role === 'receiver').length}</p>
  </div>
);

/**
 * PedagogicalMetrics component
 *
 * Generates placeholder learning metrics derived from the transcript.
 * The quality and engagement scores are rudimentary examples and
 * should be replaced with real analysis in a production system.
 */
const PedagogicalMetrics = ({ transcript }) => {
  const analyzeArgumentQuality = (messages) => {
    // Placeholder implementation: return a constant for now
    return 'Medium';
  };
  const measureEngagement = (messages) => {
    const avgMessageLength =
      messages.reduce((acc, msg) => acc + msg.content.length, 0) / messages.length;
    return avgMessageLength > 100 ? 'High' : avgMessageLength > 50 ? 'Medium' : 'Low';
  };
  const senderMessages = transcript.filter((msg) => msg.role === 'sender');
  const receiverMessages = transcript.filter((msg) => msg.role === 'receiver');
  return (
    <div className="pedagogical-metrics" style={{ marginBottom: '1rem' }}>
      <h3>Learning Metrics</h3>
      <p>Argument Quality: {analyzeArgumentQuality(transcript)}</p>
      <p>Sender Engagement: {measureEngagement(senderMessages)}</p>
      <p>Receiver Engagement: {measureEngagement(receiverMessages)}</p>
      <p>Critical Thinking Score: {Math.round(Math.random() * 100)}%</p>
      <p>Persuasion Effectiveness: {Math.round(Math.random() * 100)}%</p>
    </div>
  );
};

/**
 * GameAnalysis component
 *
 * Presents a summary of the completed game including statistics,
 * pedagogical metrics and a recap of the underlying case.  When
 * available the advocate's response to the legal question is also
 * displayed.
 */
const GameAnalysis = ({ transcript, gameState, gameContext }) => {
  // Pull scores from the LLM judgement if available.  If no judgement
  // exists, fall back to default midpoint scores.  Scores are stored
  // on the gameState.judgement object by Persuasion when the game
  // finishes.
  const defaultScores = {
    precedentMastery: 0.5,
    logicalCoherence: 0.5,
    evidenceIntegration: 0.5,
    counterArgumentHandling: 0.5,
    responsivenessToJudges: 0.5,
    adaptability: 0.5,
    clarityAndRhetoricalForce: 0.5,
    civilityProfessionalism: 0.5,
  };
  const scores = gameState.judgement?.scores
    ? { ...defaultScores, ...gameState.judgement.scores }
    : defaultScores;
  const result = gameState.judgement?.winner;
  const labelMap = {
    precedentMastery: 'Precedent Mastery',
    logicalCoherence: 'Logical Coherence',
    evidenceIntegration: 'Evidence Integration',
    counterArgumentHandling: 'Counter‑Argument Handling',
    responsivenessToJudges: 'Responsiveness to Judges',
    adaptability: 'Adaptability',
    clarityAndRhetoricalForce: 'Clarity & Rhetorical Force',
    civilityProfessionalism: 'Civility & Professionalism',
  };
  return (
    <div className="game-analysis">
      <h2>Game Analysis</h2>
      {result && (
        <p>
          <strong>Result:</strong>{' '}
          {result === 'user'
            ? 'You won the argument!'
            : result === 'opponent'
            ? 'You lost the argument.'
            : 'The game was a draw.'}
        </p>
      )}
      <GameStatistics transcript={transcript} />
      {/* Display LLM‑judged scores */}
      <div className="llm-evaluation">
        <h3>LLM Evaluation Scores</h3>
        <ul className="llm-scores">
          {Object.entries(scores).map(([key, value]) => (
            <li key={key}>
              <strong>{labelMap[key]}:</strong> {(value * 100).toFixed(0)}%
            </li>
          ))}
        </ul>
      </div>
      <PedagogicalMetrics transcript={transcript} />
      <div className="case-summary">
      <h3>Case Details</h3>
      <p>{gameContext.caseDetails}</p>
      <h3>Legal Question</h3>
      <p>{gameContext.legalQuestion}</p>
      {gameContext.advocateResponse && (
        <>
          <h3>Advocate Response</h3>
          <p>{gameContext.advocateResponse}</p>
        </>
      )}
      </div>
    </div>
  );
};

export default GameAnalysis;