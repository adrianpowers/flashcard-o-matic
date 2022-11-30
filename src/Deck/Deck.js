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

export default function Deck() {
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
            <Study deck={deck} cards={cards}/>
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
