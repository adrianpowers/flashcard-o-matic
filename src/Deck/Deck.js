import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import TwoLevelBreadcrumb from "../utils/TwoLevelBreadcrumb";
import Card from "../Card/Card";
import Study from "../Study/Study";
import EditDeck from "../EditDeck/EditDeck";
import CardSwitch from "../Card/CardSwitch";

// this Deck component serves as the main functional component in this app
// by holding and passing down the state for over half the project.

export default function Deck() {

  // uses the DeckID param from the path to load the deck in a useEffect,
  // sets deck and card states to empty arrays,
  // grabs URL and path from useRouteMatch to make buttons and routes work,
  // and creates a history to allow for returning to homepage after deck deletion.
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { url, path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      setCards(loadedDeck.cards);
    }
    loadDeck();
  }, [deckId]);

  const handleDeckDelete = async (deckId) => {
    if (window.confirm("Delete Deck?\n\nYou will not be able to recover it.")) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  // the JSX in the return statement is within a switch to allow for nested routes.
  // at the exact path of the deck, returns an in depth page containing the deck,
  // the deck's cards, and several buttons to allow for CRUD operations.
  // the other routes go to the Study and Edit pages for this deck,
  // as well as an empty page, CardSwitch, that holds the routes for all the Card-related components. 
  return (
    <>
      <div>
        <Switch>
          <Route exact path={path}>
            <TwoLevelBreadcrumb deck={deck} />
            <div className="mb-4">
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
              <Link to={`${url}/edit`}>
                <button className="btn btn-secondary mr-1">
                  <span className="oi oi-pencil"></span> Edit
                </button>
              </Link>
              <Link to={`${url}/study`}>
                <button className="btn btn-primary m-1">
                  <span className="oi oi-book"></span> Study
                </button>
              </Link>
              <Link to={`${url}/cards/new`}>
                <button className="btn btn-primary m-1">
                  <span className="oi oi-plus"></span> Add Cards
                </button>
              </Link>
              <button
                type="button"
                onClick={() => handleDeckDelete(deck.id)}
                className="btn btn-danger m-1"
              >
                <span className="oi oi-trash"></span>
              </button>
            </div>
            <h2>Cards</h2>
            {cards.map((card, ind) => (
              <Card key={ind} card={card} />
            ))}
          </Route>
          <Route path={`${path}/study`}>
            <Study />
          </Route>
          <Route path={`${path}/edit`}>
            <EditDeck deck={deck}/>
          </Route>
          <Route path={`${path}/cards`}>
            <CardSwitch deck={deck} />
          </Route>
        </Switch>
      </div>
    </>
  );
}
