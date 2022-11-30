import React from "react"
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import CardForm from "./CardForm"

// Deck is state passed down from Deck -> CardSwitch.
// Return statement calls the relevant Breadcrumb component,
// an h1 with the active deck's name as a prop,
// and a CardForm component with the active deck's id 
// and an empty card array as props. 

export default function AddCard({deck}) {
  return (
    <>
      <ThreeLevelBreadcrumb deck={deck}/>
      <h1>{deck.name}: Add Card</h1>
      <CardForm deckId={deck.id} card={[]} />
    </>
  )
}