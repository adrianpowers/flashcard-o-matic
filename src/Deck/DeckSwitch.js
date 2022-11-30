import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CreateDeck from "../CreateDeck/CreateDeck"
import Deck from "../Deck/Deck"

// this is an empty page at /decks/ which serves to simply hold the Deck related routes:
// decks/new for creating a new deck using the CreateDeck component, 
// and /decks/:deckId which calls the Deck component.

export default function DeckSwitch() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/new`}>
        <CreateDeck />
      </Route>
      <Route path={`${path}/:deckId`}>
        <Deck />
      </Route>
    </Switch>
  );
}
