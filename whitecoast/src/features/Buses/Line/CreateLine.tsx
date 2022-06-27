import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { BusLine } from "../../../app/models/busLine";

interface Props {
  busLine: BusLine | undefined;
  createOrEdit: (busLine: BusLine) => void;
      closeForm:()=>void;
}

export default function CreateLine({
  busLine: selectedLine,
  createOrEdit,
  closeForm
}: Props) {
  const initialState = selectedLine ?? {
    id: "",
    start: "",
    end: "",
    startTime: "",
    endTime: "",
    bus:""
  };

  const [busLine, setBusLine] = useState(initialState);

  function handleSubmit() {
    createOrEdit(busLine);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBusLine({ ...busLine, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={busLine.start}
          placeholder="start"
          name="start"
          onChange={handleInputChange}
        />
        <Form.Input
          value={busLine.end}
          placeholder="end"
          name="end"
          onChange={handleInputChange}
        />
        <Form.Input
          value={busLine.startTime}
          placeholder="startTime"
          name="startTime"
          type="time"
          onChange={handleInputChange}
        />
        <Form.Input
          value={busLine.endTime}
          placeholder="endTime"
          name="endTime"
          type="time"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeForm} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
