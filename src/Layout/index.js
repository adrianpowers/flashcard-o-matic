import React from "react";
import { Switch, Route } from "react-router-dom"
import Header from "./Header";
import Home from "./Home"
import Deck from "../Deck/Deck"
import Study from "../Study/Study"
import CreateDeck from "../CreateDeck/CreateDeck"
import EditCard from "../Card/EditCard"
import EditDeck from "../EditDeck/EditDeck"
import AddCard from "../Card/AddCard"
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          // from here...

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          // through here, could be nested somewhere else probably, maybe in Deck.js?

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
