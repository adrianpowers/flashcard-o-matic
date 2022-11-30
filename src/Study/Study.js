import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import { readDeck } from "../utils/api";

export default function Study() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardInd, setCardInd] = useState(0);
  const [text, setText] = useState("");
  const [showNext, setShowNext] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      setCards(deck.cards);
      if(cards.length > 2){
        setCard(deck.cards[0]);
        setText(deck.cards[0].front);
      }
    }
    loadDeck();
  }, [deckId, cards.length]);

  const handleFlip = () => {
    text === card.front ? setText(card.back) : setText(card.front);
    setShowNext(true);
  };

  const handleNext = () => {
    if (cardInd+1 > cards.length-1) {
      if (
        window.confirm(
          "Restart cards?\n\nClick cancel to return to the home page."
        )
      ) {
        setCard(deck.cards[0]);
        setText(deck.cards[0].front);
        setCardInd(0);
        setShowNext(false);
      } else {
        history.push("/");
      }
    } else {
      setCard(deck.cards[cardInd + 1]);
      setText(deck.cards[cardInd + 1].front);
      setCardInd(cardInd + 1);
      setShowNext(false);
    }
  };

  const nextButton = (
    <button type="button" onClick={handleNext} className="btn btn-primary">
      Next
    </button>
  );

  if (cards.length < 3) {
    return (
      <>
        <ThreeLevelBreadcrumb deck={deck} />
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button type="button" className="btn btn-primary">
            <span className="oi oi-plus"></span> Add Cards
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      <ThreeLevelBreadcrumb deck={deck} />
      <h1>Study: {deck.name}</h1>
      <div className="border p-4 m-2">
        <h4>
          Card {cardInd + 1} of {cards.length}
        </h4>
        <p>{text}</p>
        <button
          type="button"
          onClick={() => handleFlip()}
          className="btn btn-secondary mr-2"
        >
          Flip
        </button>
        {showNext && nextButton}
      </div>
    </>
  );
}
