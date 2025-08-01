import React, { useState } from 'react';

/**
 * Rules component
 *
 * Presents the rules of the Persuasion game and allows the user to
 * review and optionally modify the case details, legal question and
 * justice model.  The initial values of these fields are derived
 * from the gameContext provided by the parent component.  When the
 * user confirms their inputs the updated context is bubbled up via
 * the supplied setter.
 */
export default function Rules({ gameState, setGameState, gameContext, setGameContext }) {
  // Seed state from the provided context so that existing case
  // information is visible to the user
  const [caseDetails, setCaseDetails] = useState(gameContext.caseDetails || '');
  const [legalQuestion, setLegalQuestion] = useState(gameContext.legalQuestion || '');
  const [justiceModel, setJusticeModel] = useState(gameContext.justiceModel || '');

  const rules = [
    'Welcome to Persuasion – A Game of Communication and Influence',
    '1. There are two players: the Sender and the Receiver',
    "2. The Sender's goal is to persuade the Receiver to accept their proposal",
    '3. The Receiver must critically evaluate the Sender\'s arguments',
    '4. Players take turns sending messages in the chat interface',
    '5. The game ends when either:\n   - The Receiver accepts the proposal\n   - The Receiver definitively rejects the proposal\n   - Maximum rounds (3) are reached',
  ];

  // Commit the current case configuration into the parent context
  const handleConfirm = () => {
    setGameContext({
      ...gameContext,
      caseDetails,
      legalQuestion,
      justiceModel,
    });
  };

  const handleClear = () => {
    setCaseDetails('');
    setLegalQuestion('');
    setJusticeModel('');
    setGameContext({
      caseDetails: '',
      legalQuestion: '',
      justiceModel: '',
      advocateResponse: gameContext.advocateResponse,
    });
  };

  return (
    <div className="rules-section">
      <h2>Game Configuration</h2>
      <div className="rules-list">
        <h3>Game Rules</h3>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
      <div className="case-configuration">
        <h3>Case Configuration</h3>
        <div>
          <label>Case Details:</label>
          <textarea
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            placeholder="Enter the details of the case..."
          />
        </div>
        <div>
          <label>Legal Question:</label>
          <textarea
            value={legalQuestion}
            onChange={(e) => setLegalQuestion(e.target.value)}
            placeholder="Enter the legal question to be resolved..."
          />
        </div>
        <div>
          <label>Justice Model:</label>
          <input
            type="text"
            value={justiceModel}
            onChange={(e) => setJusticeModel(e.target.value)}
            placeholder="Enter the justice model to be applied..."
          />
        </div>
        <div className="button-row">
          <button type="button" onClick={handleClear}>Clear</button>
          <button type="button" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}