import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb";
import DeckForm from "../utils/DeckForm";

export default function EditDeck () {
  
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId)
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId])
  
  return (
    <>
      <ThreeLevelBreadcrumb deck={deck} />
      <h1>Edit Deck</h1>
      <DeckForm deck={deck}/>
    </>
  )
}