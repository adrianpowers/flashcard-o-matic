import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import { readDeck } from "../utils/api"
import CardForm from "./CardForm"

export default function AddCard() {

  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      <ThreeLevelBreadcrumb deck={deck}/>
      <h1>{deck.name}: Add Card</h1>
      <CardForm deckId={deckId} card={[]} />
    </>
  )
}