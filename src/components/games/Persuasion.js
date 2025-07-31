import React, { useState } from "react";
import Rules from "./Rules";
import Chats from "./Chats";
import Analysis from "./Analysis";

const Persuasion = () => {
  const [gameState, setGameState] = useState({
    isTerminated: false,
    senderPayoff: 0,
    receiverPayoff: 0,
    transcript: [],
  });
  const [gameContext, setGameContext] = useState({
    caseDetails: "",
    legalQuestion: "",
    justiceModel: "",
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Rules
        gameState={gameState}
        setGameState={setGameState}
        gameContext={gameContext}
        setGameContext={setGameContext}
      />
      <Chats
        gameState={gameState}
        setGameState={setGameState}
        gameContext={gameContext}
        setGameContext={setGameContext}
      />
      {gameState.isTerminated && (
        <Analysis transcript={gameState.transcript} gameState={gameState} />
      )}
    </div>
  );
};

export default Persuasion;
