import React, { useState } from 'react';

/**
 * Chats component
 *
 * Manages the conversation between the sender (player) and an
 * automated receiver.  Messages are stored locally in this
 * component as well as appended to the gameState transcript which
 * persists across components.  When a maximum number of exchanges
 * has been reached the game is terminated.
 */
export default function Chats({ gameState, setGameState, gameContext }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentRole, setCurrentRole] = useState('sender');

  const generateReceiverResponse = (senderMessage) => {
    const questions = [
      'Could you elaborate on that point?',
      'What evidence supports your claim?',
      'How does that benefit me specifically?',
      'Have you considered alternative perspectives?',
      'Can you provide more concrete examples?',
      'What makes you so confident about this?',
      'How does this address potential risks?',
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const evaluateGameState = (transcript) => {
    // Terminate after 6 exchanges (3 per side)
    const isTerminated = transcript.length >= 6;
    return {
      isTerminated,
      senderPayoff: 0,
      receiverPayoff: 0,
      transcript,
    };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    const now = new Date().toLocaleTimeString();
    const newMessage = {
      text: currentMessage,
      role: currentRole,
      timestamp: now,
    };
    const newTranscriptEntry = {
      role: currentRole,
      content: currentMessage,
    };
    if (currentRole === 'sender') {
      // Sender message, then generate automated receiver response
      const receiverText = generateReceiverResponse(currentMessage);
      const receiverMessage = {
        text: receiverText,
        role: 'receiver',
        timestamp: now,
      };
      const receiverTranscriptEntry = {
        role: 'receiver',
        content: receiverText,
      };
      setMessages([...messages, newMessage, receiverMessage]);
      const updatedTranscript = [
        ...gameState.transcript,
        newTranscriptEntry,
        receiverTranscriptEntry,
      ];
      const newGameState = evaluateGameState(updatedTranscript);
      setGameState(newGameState);
      setCurrentRole('sender');
    } else {
      // Manual receiver response path (not used in this simplified version)
      setMessages([...messages, newMessage]);
      const updatedTranscript = [...gameState.transcript, newTranscriptEntry];
      const newGameState = evaluateGameState(updatedTranscript);
      setGameState(newGameState);
      setCurrentRole('sender');
    }
    setCurrentMessage('');
  };

  return (
    <div className="chat-interface">
      {/* <div className="game-state-bar">
        <strong>Game Status:</strong> {gameState.isTerminated ? 'Ended' : 'In Progress'} |{' '}
        <strong>Case Details:</strong> {gameContext.caseDetails} |{' '}
        <strong>Legal Question:</strong> {gameContext.legalQuestion}
      </div> */}
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.role === 'sender' ? 'You' : 'Receiver'}:</strong> {message.text}
            <span style={{ marginLeft: '0.5rem', color: '#888', fontSize: '0.8em' }}>{message.timestamp}</span>
          </div>
        ))}
        {messages.length === 0 && <p>No messages yet. Start the conversation!</p>}
      </div>
      {!gameState.isTerminated && (
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}