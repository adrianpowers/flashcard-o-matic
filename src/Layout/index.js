import React from "react";
import { Switch, Route } from "react-router-dom"
import Header from "./Header";
import Home from "./Home"
import DeckSwitch from "../Deck/DeckSwitch"
import NotFound from "./NotFound";

// a simple beginner Switch that allows the header to be present on ALL pages.
// routes to the homepage, the empty DeckSwitch page at /decks/,
// and handles the 404.
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
