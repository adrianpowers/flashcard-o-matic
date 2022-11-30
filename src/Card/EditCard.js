import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import { readCard } from "../utils/api"
import CardForm from "./CardForm"

export default function EditCard({deck}) {

  const { cardId } = useParams();
  const [card, setCard] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const loadedCard = await readCard(cardId);
      setCard(loadedCard);
    }
    loadDeck();
  }, [cardId]);

  return (
    <>
      <ThreeLevelBreadcrumb deck={deck} card={card}/>
      <h1>Edit Card</h1>
      <CardForm deckId={deck.id} card={card} />
    </>
  )
}