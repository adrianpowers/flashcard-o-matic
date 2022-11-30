import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EditCard from "../Card/EditCard";
import AddCard from "../Card/AddCard";

// this is an empty page at /decks/:deckId/cards which serves only to hold Card-related routes.
// these routes either create a new card with the AddCard component,
// or edit a card at the :cardId param with the EditCard component.
// the Deck state is passed down as a prop from Deck.js.

export default function CardSwitch({deck}) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:cardId/edit`}>
        <EditCard deck={deck}/>
      </Route>
      <Route path={`${path}/new`}>
        <AddCard deck={deck}/>
      </Route>
    </Switch>
  );
}
