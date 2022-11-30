import React from "react";
import TwoLevelBreadcrumb from "../utils/TwoLevelBreadcrumb";
import DeckForm from "../Deck/DeckForm";

export default function CreateDeck() {
  // calls DeckForm and relevant Breadcrumb with empty arrays
  // because we are creating a new deck and don't need to reference one.
  return (
    <>
      <TwoLevelBreadcrumb deck={[]}/>
      <h1>Create Deck</h1>
      <DeckForm deck={[]}/>
    </>
  );
}
