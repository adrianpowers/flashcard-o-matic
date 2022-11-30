import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import { readCard } from "../utils/api"
import CardForm from "./CardForm"

export default function EditCard({deck}) {

  // Deck prop is deck state passed down from Deck -> CardSwitch. 
  const { cardId } = useParams();
  const [card, setCard] = useState([]);

  // loads card with API tools using CardId from params.
  useEffect(() => {
    async function loadDeck() {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    }
    loadDeck();
  }, [cardId]);

  // returns JSX of:
  // relevant Breadcrumb component, passing Deck and Card states down
  // and a CardForm which passes down the deck state's ID value and the Card state.
  return (
    <>
      <ThreeLevelBreadcrumb deck={deck} />
      <h1>Edit Card</h1>
      <CardForm deckId={deck.id} card={card} />
    </>
  )
}