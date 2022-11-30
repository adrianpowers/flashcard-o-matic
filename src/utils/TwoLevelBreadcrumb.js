import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function TwoLevelBreadcrumb({deck}) {

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