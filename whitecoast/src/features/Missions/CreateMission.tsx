import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Mission } from "../../app/models/mission";


interface Props {
  mission: Mission | undefined;
  createOrEdit: (mission: Mission) => void;
  closeMission:()=>void;
}

export default function CreateMission({
  mission: selectedMission,
  createOrEdit,
  closeMission
}: Props) {
  const initialState = selectedMission ?? {
    id: "",
    name: "",
    location: '',
    time:'',
    rank:'',
    priority:''
  };

  const [mission, setMission] = useState(initialState);

  function handleSubmit() {
    createOrEdit(mission);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setMission({ ...mission, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={mission.name}
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={mission.location }
          placeholder="Location"
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          value={mission.time}
          placeholder="Time"
          name="time"
          type="time"
          onChange={handleInputChange}
        />
        <Form.Input
          value={mission.rank }
          placeholder="Rank"
          name="rank"
          onChange={handleInputChange}
        />
        <Form.Input
          value={mission.priority }
          placeholder="Priority"
          name="priority"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeMission} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
