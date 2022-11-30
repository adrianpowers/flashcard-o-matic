import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";

// takes Deck state as a prop

export default function ThreeLevelBreadcrumb({deck}) {

  // uses path and CardId and a variable called "active"
  // to make the breadcrumb match the active page's name 
  const { path } = useRouteMatch()
  const { cardId } = useParams();
  let active = "";
  if(path.includes("study")) active = "Study";
  if(path.includes("/:deckId/edit")) active = "Edit Deck";
  if(path.includes("/cards/new")) active = "Add Card"
  if(path.includes("/:cardId/edit")) active = `Edit Card ${cardId}`;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={"/"}><span className="oi oi-home"></span> Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {active}
        </li>
      </ol>
    </nav>
  );
}