import React from "react";

const GameStateBar = ({ gameState, currentRole, gameContext }) => {
  const justiceProfiles = [
    "Utilitarian Justice",
    "Retributive Justice",
    "Restorative Justice",
    "Distributive Justice",
    "Procedural Justice",
  ];

  return (
    <>
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong>Game Status:</strong>{" "}
          {gameState.isTerminated ? "Ended" : "In Progress"}
        </div>
        <div>
          <strong>Sender Score:</strong> {gameState.senderPayoff}
        </div>
        <div>
          <strong>Receiver Score:</strong> {gameState.receiverPayoff}
        </div>
      </div>
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div>
          <strong>Case Details:</strong> {gameContext.caseDetails}
        </div>
        <div>
          <strong>Legal Question:</strong> {gameContext.legalQuestion}
        </div>
        <div>
          <strong>Justice Model:</strong> {gameContext.justiceModel}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minWidth: "300px",
            }}
          >
            <strong>Current Justice</strong>
            <select
              style={{
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Select a Profile Type</option>
              {justiceProfiles.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          {gameContext.justiceModel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: "300px",
              }}
            >
              <strong>Profile Approach:</strong>
              <select
                style={{
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="">Select an Approach</option>
                {justiceProfiles[Object.keys(justiceProfiles)[0]].map(
                  (profile) => (
                    <option key={profile} value={profile}>
                      {profile}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#666",
        }}
      >
        Current Turn:{" "}
        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
      </div>
    </>
  );
};

export default GameStateBar;
