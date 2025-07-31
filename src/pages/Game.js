import React, { useState } from "react";
import Persuasion from "../components/games/Persuasion";

function Game() {
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const gameOptions = [
    {
      id: 1,
      name: "Persuasion",
      description: "Persuasion Game",
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

  const handleReset = () => {
    setSelectedGame(null);
    setShowGameOptions(true);
  };

  const renderGame = () => {
    if (!selectedGame) return null;
    const GameComponent = selectedGame.component;
    return <GameComponent {...selectedGame.params} />;
  };

  return (
    <div
      className="Game"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#2c3e50",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Welcome to the Game
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#7f8c8d",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Get ready to play!
      </p>

      {showGameOptions ? (
        <div
          className="game-options"
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              color: "#2c3e50",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Choose a Game
          </h2>
          <div
            className="game-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {gameOptions.map((game) => (
              <div
                key={game.id}
                className="game-option"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                  border: "1px solid #e1e8ed",
                  ":hover": { transform: "translateY(-4px)" },
                }}
              >
                <h3
                  style={{
                    fontSize: "1.4rem",
                    color: "#2c3e50",
                    marginBottom: "0.5rem",
                  }}
                >
                  {game.name}
                </h3>
                <p style={{ color: "#7f8c8d", marginBottom: "1rem" }}>
                  {game.description}
                </p>
                <button
                  onClick={() => handleGameSelect(game)}
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    padding: "0.8rem 1.5rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "1rem",
                    transition: "background-color 0.2s",
                    ":hover": { backgroundColor: "#2980b9" },
                  }}
                >
                  Play {game.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="game-board"
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {selectedGame && (
            <>
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "#2c3e50",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                Playing {selectedGame.name}
              </h2>
              {renderGame()}
            </>
          )}
        </div>
      )}

      <div
        className="game-controls"
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <button
          onClick={() => setShowGameOptions(true)}
          style={{
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.2s",
            ":hover": { backgroundColor: "#27ae60" },
          }}
        >
          Start Game
        </button>
        <button
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.2s",
            ":hover": { backgroundColor: "#c0392b" },
          }}
        >
          Pause Game
        </button>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.2s",
            ":hover": { backgroundColor: "#7f8c8d" },
          }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default Game;
