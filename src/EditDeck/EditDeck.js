import React from "react";
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb";
import DeckForm from "../Deck/DeckForm";

export default function EditDeck ({deck}) {
  // takes Deck state from Deck.js as a prop, 
  // then passes it down to and returns the following components:
  // the relevant Breadcrumb component
  // and a DeckForm component.
  return (
    <>
      <ThreeLevelBreadcrumb deck={deck} />
      <h1>Edit Deck</h1>
      <DeckForm deck={deck}/>
    </>
  )
}