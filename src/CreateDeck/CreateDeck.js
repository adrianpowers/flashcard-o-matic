import React from "react";
import TwoLevelBreadcrumb from "../utils/TwoLevelBreadcrumb";
import DeckForm from "../utils/DeckForm";

export default function CreateDeck() {
  return (
    <>
      <TwoLevelBreadcrumb deck={[]}/>
      <h1>Create Deck</h1>
      <DeckForm deck={[]}/>
    </>
  );
}
