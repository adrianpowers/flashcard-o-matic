import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

// takes the Deck state as a prop

export default function TwoLevelBreadcrumb({deck}) {

  // uses the path from useRouteMatch to check where this is being called,
  // because the second active page of the breadcrumb will be different 
  // depending on what calls it;
  // in this case, if it is called from the CreateDeck component
  // and the path is /decks/new, the active page should say Create Deck,
  // but any other time this Breadcrumb is used,
  // it should have the active Deck's name.
  const { path } = useRouteMatch();

  if(path === "/decks/new"){
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}><span className="oi oi-home"></span> Home</Link>
          </li> 
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
    );
  } else {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}><span className="oi oi-home"></span> Home</Link>
          </li> 
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
    );
  }
}