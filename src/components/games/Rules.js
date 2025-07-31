import React, { useState } from "react";

const Rules = ({ gameState, setGameState, gameContext, setGameContext }) => {
  const [caseDetails, setCaseDetails] = useState("");
  const [legalQuestion, setLegalQuestion] = useState("");
  const [justiceModel, setJusticeModel] = useState("");

  const rules = [
    "Welcome to Persuasion - A Game of Communication and Influence",
    "1. There are two players: the Sender and the Receiver",
    "2. The Sender's goal is to persuade the Receiver to accept their proposal",
    "3. The Receiver must critically evaluate the Sender's arguments",
    "4. Players take turns sending messages in the chat interface",
    "5. The game ends when either:",
    "   - The Receiver accepts the proposal",
    "   - The Receiver definitively rejects the proposal",
    "   - Maximum rounds (3) are reached",
  ];

  const handleConfirm = () => {
    const newGameContext = {
      caseDetails,
      legalQuestion,
      justiceModel,
    };
    setGameContext(newGameContext);
  };

  const handleClear = () => {
    setCaseDetails("");
    setLegalQuestion("");
    setJusticeModel("");
    setGameContext({
      caseDetails: "",
      legalQuestion: "",
      justiceModel: "",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        maxWidth: "800px",
        width: "100%",
      }}
    >
      <h2>Game Configuration</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Game Rules</h3>
        {rules.map((rule, index) => (
          <p key={index} style={{ margin: "10px 0" }}>
            {rule}
          </p>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            color: "#2c3e50",
            marginBottom: "15px",
          }}
        >
          Case Configuration
        </h3>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="caseDetails"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "1rem",
              color: "#34495e",
              fontWeight: "500",
            }}
          >
            Case Details:
          </label>
          <textarea
            id="caseDetails"
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e0",
              minHeight: "120px",
              fontSize: "0.95rem",
              fontFamily: "inherit",
              resize: "none",
            }}
            placeholder="Enter the details of the case..."
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="legalQuestion"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "1rem",
              color: "#34495e",
              fontWeight: "500",
            }}
          >
            Legal Question:
          </label>
          <input
            type="text"
            id="legalQuestion"
            value={legalQuestion}
            onChange={(e) => setLegalQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e0",
              fontSize: "0.95rem",
              fontFamily: "inherit",
            }}
            placeholder="Enter the legal question to be resolved..."
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="justiceModel"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "1rem",
              color: "#34495e",
              fontWeight: "500",
            }}
          >
            Justice Model:
          </label>
          <input
            type="text"
            id="justiceModel"
            value={justiceModel}
            onChange={(e) => setJusticeModel(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e0",
              fontSize: "0.95rem",
              fontFamily: "inherit",
            }}
            placeholder="Enter the justice model to be applied..."
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleClear}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
