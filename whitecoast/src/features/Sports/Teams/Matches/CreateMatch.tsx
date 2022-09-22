import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Match } from "../../../../app/models/match";

interface Props {
  match: Match | undefined;
  createOrEdit: (match: Match) => void;
      closeForm:()=>void;
}

export default function CreateMatch({
  match: selectedMatch,
  createOrEdit,
  closeForm
}: Props) {
  const initialState = selectedMatch ?? {
    id: "",
    name: "",
    sport: "",
    team: '',
    location: ''
  };

  const [match, setTeam] = useState(initialState);

  function handleSubmit() {
    createOrEdit(match);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTeam({ ...match, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={match.name}
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={match.sport}
          placeholder="Sport"
          name="sport"
          onChange={handleInputChange}
        />
        <Form.Input
          value={match.team}
          placeholder="Team"
          name="team"
          onChange={handleInputChange}
        />
        <Form.Input
          value={match.location}
          placeholder="Location"
          name="location"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeForm} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
