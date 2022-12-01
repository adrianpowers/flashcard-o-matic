import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";

export default function DeckForm({ deck }) {

  // takes Deck state as prop from EditDeck and CreateDeck (where it is empty).

  // sets initial form state to an empty deck name and description.
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  // uses history to refresh or return to Deck page when relevant.
  const history = useHistory();

  // handlers begin null and are assigned values based on the length of the Deck prop.
  // the change and submit will be different depending on whether...
  // we are creating a new deck (when the deck length is 0)
  // or if we are editing a deck (when the deck length is > 0)
  let handleChange = null;
  let handleSubmit = null;

  if (deck.length === 0) {
    handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
    handleSubmit = async (event) => {
      event.preventDefault();
      console.log(formData);
      const { id } = await createDeck(formData);
      setFormData({ ...initialFormState });
      history.push(`/decks/${id}`);
    };
  } else {
    handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        id: deck.id
      })
    }
    handleSubmit = async (event) => {
      event.preventDefault();
      const updatedDeck = await updateDeck(formData);
      console.log(updatedDeck);
      setFormData({ ...initialFormState });
      history.go(0);
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        id="name"
        type="text"
        name="name"
        className="form-control"
        placeholder="Deck Name"
        onChange={handleChange}
        defaultValue={deck.name}
      />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        placeholder="Brief description of the deck"
        onChange={handleChange}
        defaultValue={deck.description}
      />
      <br />
      <button className="btn btn-secondary" onClick={() => history.push("/")}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary ml-2">
        Submit
      </button>
    </form>
  );
}
