import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import { readCard, readDeck } from "../utils/api"
import CardForm from "./CardForm"

export default function EditCard() {

  const { deckId, cardId } = useParams();
  const [card, setCard] = useState([]);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      const loadedCard = await readCard(cardId);
      setDeck(loadedDeck);
      setCard(loadedCard);
    }
    loadDeck();
  }, [deckId, cardId]);

  return (
    <>
      <ThreeLevelBreadcrumb deck={deck} card={card}/>
      <h1>Edit Card</h1>
      <CardForm deckId={deckId} card={card} />
    </>
  )
}