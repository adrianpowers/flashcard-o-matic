import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

export default function CardForm({ deckId, card }) {

  // takes a DeckID and a Card as props.

  // sets initial form state to an empty card front and back.
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  // uses history to refresh page and return to the Deck page when relevant.
  const history = useHistory();

  // handlers begin null and are assigned values based on the length of the Card prop.
  // the change and submit will be different depending on whether... 
  // we are adding a new card (when the card length is 0)
  // or if we are editing a card (when the card length is > 0)

  let handleChange = null;
  let handleSubmit = null;

  // this boolean lets us conditionally render different button texts within the JSX return statement.
  let isEditing = false;

  if (card.length === 0) {
    handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
    handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formData);
      await createCard(deckId, formData);
      setFormData({ ...initialFormState });
      history.go(0);
    };
  } else {
    isEditing = true;
    handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        deckId: Number(deckId),
        id: card.id,
      })
    }
    handleSubmit = async (event) => {
      event.preventDefault();
      await updateCard(formData);
      setFormData({ ...initialFormState });
      history.push(`/decks/${deckId}`);
      history.go(0);
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">Front:</label>
      <br />
      <textarea
        id="front"
        type="text"
        name="front"
        className="form-control"
        placeholder="Front side of card"
        onChange={handleChange}
        defaultValue={card.front}
      />
      <br />
      <label htmlFor="back">Back:</label>
      <textarea
        id="back"
        name="back"
        className="form-control"
        placeholder="Back side of card"
        onChange={handleChange}
        defaultValue={card.back}
      />
      <br />
      <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
        { isEditing ? "Cancel" : "Done" }
      </button>
      <button type="submit" className="btn btn-primary ml-2">
        { isEditing ? "Submit" : "Save" }
      </button>
    </form>
  );
}
