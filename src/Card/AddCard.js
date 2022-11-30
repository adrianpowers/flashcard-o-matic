import React from "react"
import ThreeLevelBreadcrumb from "../utils/ThreeLevelBreadcrumb"
import CardForm from "./CardForm"

export default function AddCard({deck}) {
  return (
    <>
      <ThreeLevelBreadcrumb deck={deck}/>
      <h1>{deck.name}: Add Card</h1>
      <CardForm deckId={deck.id} card={[]} />
    </>
  )
}