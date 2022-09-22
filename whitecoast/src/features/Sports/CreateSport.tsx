import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Sport } from "../../app/models/sport";


interface Props {
  sport: Sport | undefined;
  createOrEdit: (sport: Sport) => void;
  closeForm:()=>void;
}

export default function CreateSport({
  sport: selectedSport,
  createOrEdit,
  closeForm
}: Props) {
  const initialState = selectedSport ?? {
    id: "",
    type: "",
    playerNum: 0
  };

  const [sport, setSport] = useState(initialState);

  function handleSubmit() {
    createOrEdit(sport);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSport({ ...sport, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={sport.type}
          placeholder="Type"
          name="type"
          onChange={handleInputChange}
        />
        <Form.Input
          value={sport.playerNum || null}
          placeholder="Number of Players"
          name="playerNum"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeForm} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
