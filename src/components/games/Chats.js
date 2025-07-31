import React, { useState } from "react";
import GameStateBar from "./Bar";

const MessageBubble = ({ message }) => (
  <div
    style={{
      marginBottom: "10px",
      textAlign: message.role === "sender" ? "left" : "right",
    }}
  >
    <div
      style={{
        display: "inline-block",
        backgroundColor: message.role === "sender" ? "#007bff" : "#6c757d",
        color: "white",
        padding: "8px 12px",
        borderRadius: "15px",
        maxWidth: "70%",
      }}
    >
      <strong>{message.role}: </strong>
      {message.text}
      <div
        style={{
          fontSize: "0.8em",
          opacity: 0.8,
        }}
      >
        {message.timestamp}
      </div>
    </div>
  </div>
);

const MessageList = ({ messages }) => (
  <div
    style={{
      height: "400px",
      overflowY: "auto",
      padding: "20px",
      backgroundColor: "#fff",
    }}
  >
    {messages.map((message, index) => (
      <MessageBubble key={index} message={message} />
    ))}
  </div>
);

const MessageInput = ({
  currentMessage,
  currentRole,
  gameState,
  onMessageChange,
  onSubmit,
}) => (
  <form
    onSubmit={onSubmit}
    style={{
      display: "flex",
      padding: "20px",
      borderTop: "1px solid #ddd",
    }}
  >
    <input
      type="text"
      value={currentMessage}
      onChange={onMessageChange}
      placeholder={`Type your message as ${currentRole}...`}
      disabled={gameState.isTerminated}
      style={{
        flex: 1,
        padding: "10px",
        marginRight: "10px",
        borderRadius: "4px",
        border: "1px solid #ddd",
      }}
    />
    <button
      type="submit"
      disabled={gameState.isTerminated}
      style={{
        padding: "10px 20px",
        backgroundColor: gameState.isTerminated ? "#ccc" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: gameState.isTerminated ? "not-allowed" : "pointer",
      }}
    >
      Send
    </button>
  </form>
);

const Chats = ({ gameState, setGameState, gameContext, setGameContext }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRole, setCurrentRole] = useState("sender");

  const generateReceiverResponse = (senderMessage) => {
    const questions = [
      "Could you elaborate on that point?",
      "What evidence supports your claim?",
      "How does that benefit me specifically?",
      "Have you considered alternative perspectives?",
      "Can you provide more concrete examples?",
      "What makes you so confident about this?",
      "How does this address potential risks?",
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const evaluateGameState = (transcript) => {
    // This is a placeholder implementation
    // In practice, this would analyze the transcript and determine:
    // - If game should terminate (proposal accepted/rejected or max rounds reached)
    // - Calculate current payoffs for both players
    return {
      isTerminated: transcript.length >= 6, // Terminate after 6 exchanges
      senderPayoff: 0,
      receiverPayoff: 0,
      transcript: transcript,
    };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMessage = {
      text: currentMessage,
      role: currentRole,
      timestamp: new Date().toLocaleTimeString(),
    };

    const newTranscriptEntry = {
      role: currentRole,
      content: currentMessage,
    };

    if (currentRole === "sender") {
      const receiverResponse = {
        text: generateReceiverResponse(currentMessage),
        role: "receiver",
        timestamp: new Date().toLocaleTimeString(),
      };

      const receiverTranscriptEntry = {
        role: "receiver",
        content: receiverResponse.text,
      };

      setMessages([...messages, newMessage, receiverResponse]);
      const updatedTranscript = [
        ...gameState.transcript,
        newTranscriptEntry,
        receiverTranscriptEntry,
      ];

      // Evaluate game state after receiver's automated response
      const newGameState = evaluateGameState(updatedTranscript);
      setGameState(newGameState);
      setCurrentRole("sender"); // Always return to sender after receiver responds
    } else {
      setMessages([...messages, newMessage]);
      const updatedTranscript = [...gameState.transcript, newTranscriptEntry];

      // Evaluate game state after receiver's manual response
      const newGameState = evaluateGameState(updatedTranscript);
      setGameState(newGameState);
      setCurrentRole("sender"); // Switch back to sender after receiver manually sends
    }

    setCurrentMessage("");
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <GameStateBar
          gameState={gameState}
          currentRole={currentRole}
          gameContext={gameContext}
        />
        <MessageList messages={messages} />
        <MessageInput
          currentMessage={currentMessage}
          currentRole={currentRole}
          gameState={gameState}
          onMessageChange={(e) => setCurrentMessage(e.target.value)}
          onSubmit={handleSendMessage}
        />
      </div>
    </>
  );
};

export default Chats;
