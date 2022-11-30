import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

export default function CardForm({ deckId, card }) {
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const history = useHistory();

  let handleChange = null;
  let handleSubmit = null;
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
      const updatedCard = await updateCard(formData);
      console.log(updatedCard);
      console.log("Editing card...")
      setFormData({ ...initialFormState });
      history.push(`/decks/${deckId}`);
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
      <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}/`)}>
        { isEditing ? "Cancel" : "Done" }
      </button>
      <button type="submit" className="btn btn-primary ml-2">
        { isEditing ? "Submit" : "Save" }
      </button>
    </form>
  );
}
