import React from "react";
import {
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { deleteCard } from "../utils/api";

export default function Card(card) {
  const { url } = useRouteMatch();
  const { front, back, id } = card.card;
  const history = useHistory();

  const handleCardDelete = async (id) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(id);
      history.go(0);
    }
  };

  return (
    <div className="row border">
      <div className="p-4 col-6">
        <p>{front}</p>
      </div>
      <div className="p-4 col-6">
        <p>{back}</p>
      </div>
      <Link to={`${url}/cards/${id}/edit`}>
        <button className="btn btn-secondary m-2">
          <span className="oi oi-pencil"></span> Edit
        </button>
      </Link>
      <button
        type="button"
        onClick={() => handleCardDelete(id)}
        className="btn btn-danger m-2"
      >
        <span className="oi oi-trash"></span>
      </button>
    </div>
  );
}
