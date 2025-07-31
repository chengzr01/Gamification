import React, { useState } from "react";
import Persuasion from "../components/games/Persuasion";

function Game() {
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const gameOptions = [
    {
      id: 1,
      name: "Persuasion",
      description: "Classic X's and O's game",
      component: Persuasion,
      params: {
        boardSize: 3,
        winLength: 3,
      },
    },
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setShowGameOptions(false);
  };

  const renderGame = () => {
    if (!selectedGame) return null;
    const GameComponent = selectedGame.component;
    return <GameComponent {...selectedGame.params} />;
  };

  return (
    <div className="Game">
      <h1>Welcome to the Game</h1>
      <p>Get ready to play!</p>

      {showGameOptions ? (
        <div className="game-options">
          <h2>Choose a Game</h2>
          <div className="game-list">
            {gameOptions.map((game) => (
              <div key={game.id} className="game-option">
                <h3
                  onClick={() => handleGameSelect(game)}
                  style={{ cursor: "pointer" }}
                >
                  {game.name}
                </h3>
                <p>{game.description}</p>
                <button onClick={() => handleGameSelect(game)}>
                  Play {game.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-board">
          {selectedGame && (
            <>
              <h2>Playing {selectedGame.name}</h2>
              {renderGame()}
            </>
          )}
        </div>
      )}

      <div className="game-controls">
        <button onClick={() => setShowGameOptions(true)}>Start Game</button>
        <button>Pause Game</button>
        <button>Reset Game</button>
      </div>
    </div>
  );
}

export default Game;
