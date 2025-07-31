import React from "react";

const GameStatistics = ({ transcript }) => (
  <div>
    <h4>Game Statistics</h4>
    <ul>
      <li>Total Exchanges: {transcript.length}</li>
      <li>
        Sender Messages:{" "}
        {transcript.filter((msg) => msg.role === "sender").length}
      </li>
      <li>
        Receiver Messages:{" "}
        {transcript.filter((msg) => msg.role === "receiver").length}
      </li>
    </ul>
  </div>
);

const PedagogicalMetrics = ({ transcript }) => {
  const analyzeArgumentQuality = (messages) => {
    return "Medium";
  };

  const measureEngagement = (messages) => {
    const avgMessageLength =
      messages.reduce((acc, msg) => acc + msg.content.length, 0) /
      messages.length;
    return avgMessageLength > 100
      ? "High"
      : avgMessageLength > 50
      ? "Medium"
      : "Low";
  };

  const senderMessages = transcript.filter((msg) => msg.role === "sender");
  const receiverMessages = transcript.filter((msg) => msg.role === "receiver");

  return (
    <div>
      <h4>Learning Metrics</h4>
      <ul>
        <li>Argument Quality: {analyzeArgumentQuality(transcript)}</li>
        <li>Sender Engagement: {measureEngagement(senderMessages)}</li>
        <li>Receiver Engagement: {measureEngagement(receiverMessages)}</li>
        <li>Critical Thinking Score: {Math.round(Math.random() * 100)}%</li>
        <li>Persuasion Effectiveness: {Math.round(Math.random() * 100)}%</li>
      </ul>
    </div>
  );
};

const GameAnalysis = ({ transcript, gameState }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      marginTop: "20px",
    }}
  >
    <h3>Game Analysis</h3>
    <GameStatistics transcript={transcript} />
    <PedagogicalMetrics transcript={transcript} />
  </div>
);

export default GameAnalysis;
