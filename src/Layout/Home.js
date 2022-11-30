import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

export default function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const decks = await listDecks();
      setDecks(decks);
    }
    loadDecks();
  }, []);

  const handleDelete = async (deckId) => {
    if (window.confirm("Delete Deck?\n\nYou will not be able to recover it.")) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-secondary">
        <Link to="/decks/new" className="text-white">
          <span className="oi oi-plus"></span> Create Deck
        </Link>
      </button>
      {decks.map((deck) => (
        <div key={deck.id} className="border my-3 p-3">
          <h2>{deck.name}</h2>
          <p className="text-secondary">{deck.cards.length} cards</p>
          <p>{deck.description}</p>

          <Link to={`/decks/${deck.id}`} className="text-white">
            <button type="button" className="btn btn-secondary m-1">
              <span className="oi oi-eye"></span> View
            </button>
          </Link>

          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary m-1">
              <span className="oi oi-book"></span> Study
            </button>
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(deck.id)}
            className="btn btn-danger m-1"
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      ))}
    </>
  );
}
