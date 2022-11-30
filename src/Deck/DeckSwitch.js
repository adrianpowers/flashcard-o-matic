import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CreateDeck from "../CreateDeck/CreateDeck"
import Deck from "../Deck/Deck"

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
