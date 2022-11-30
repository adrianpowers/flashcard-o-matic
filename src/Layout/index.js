import React from "react";
import { Switch, Route } from "react-router-dom"
import Header from "./Header";
import Home from "./Home"
import DeckSwitch from "../Deck/DeckSwitch"
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
          <Route path="/decks">
            <DeckSwitch />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
