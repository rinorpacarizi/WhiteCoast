import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Team } from "../../../app/models/team";

interface Props {
  team: Team | undefined;
  createOrEdit: (team: Team) => void;
      closeForm:()=>void;
}

export default function CreateTeam({
  team: selectedTeam,
  createOrEdit,
  closeForm
}: Props) {
  const initialState = selectedTeam ?? {
    id: "",
    name: "",
    sport: "",
    totalSpace: 0,
    freeSpace: 0
  };

  const [team, setTeam] = useState(initialState);

  function handleSubmit() {
    createOrEdit(team);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={team.name}
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={team.sport}
          placeholder="Sport"
          name="sport"
          onChange={handleInputChange}
        />
        <Form.Input
          value={team.totalSpace}
          placeholder="Total Space"
          name="totalSpace"
          onChange={handleInputChange}
        />
        <Form.Input
          value={team.freeSpace}
          placeholder="Free Space"
          name="freeSpace"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeForm} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
