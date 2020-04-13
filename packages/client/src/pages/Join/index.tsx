import React, { useState } from "react";
import { useTitle } from "hookrouter";
import { Form, Button } from "react-bootstrap";
import { createGame, joinGame } from "../../api";

interface IJoinProps {
  newGame: boolean;
  onGameSetup: (gameId: string, userToken: string, playerId: string) => void;
}

const Join: React.FC<IJoinProps> = ({ newGame, onGameSetup }) => {
  const title = newGame ? "Create Game" : "Join Game";

  const [gameId, setGameId] = useState("");
  const [name, setName] = useState("");
  const [gameError, setGameError] = useState(false);
  const [nameError, setNameError] = useState(false);

  useTitle(`${title} - Monopoly Money`);

  const onGameIdChange = (event: React.FormEvent<HTMLInputElement>) => {
    setGameId(event.currentTarget.value ?? "");
  };

  const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value || ""); // TODO Why can't I use??
  };

  const onSubmit = () => {
    if (newGame) {
      // Validity check
      if (name === "") {
        setNameError(true);
        return;
      }
      // Create game
      createGame(name)
        .then((result) => {
          onGameSetup(result.gameId, result.userToken, result.playerId);
        })
        .catch((error) => console.log(error));
    } else {
      // Validity check
      if (gameId === "") {
        setGameError(true);
        return;
      }
      if (name === "") {
        setNameError(true);
        return;
      }
      // Join game
      joinGame(gameId, name)
        .then((result) => {
          if (result === "DoesNotExist") {
            console.warn("Does not Exist"); // TODO
          } else if (result === "NotOpen") {
            console.warn("Not Open"); // TODO
          } else {
            onGameSetup(result.gameId, result.userToken, result.playerId);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h1>{title}</h1>

      {!newGame && (
        <Form.Group>
          <Form.Label>Game Id</Form.Label>
          <Form.Control placeholder="XXXXXX" value={gameId} onChange={onGameIdChange} />
          {gameError && (
            <Form.Text style={{ color: "var(--danger)" }}>That game does not exist</Form.Text>
          )}
        </Form.Group>
      )}

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Name" value={name} onChange={onNameChange} />
        {nameError && (
          <Form.Text style={{ color: "var(--danger)" }}>Please provide a name</Form.Text>
        )}
      </Form.Group>

      <Button block variant="primary" onClick={onSubmit}>
        {newGame ? "Create" : "Join"}
      </Button>
    </div>
  );
};

export default Join;
