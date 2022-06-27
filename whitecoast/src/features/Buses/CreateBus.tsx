import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Bus } from "../../app/models/bus";


interface Props {
  bus: Bus | undefined;
  createOrEdit: (busLine: Bus) => void;
  closeForm:()=>void;
}

export default function CreateBus({
  bus: selectedBus,
  createOrEdit,
  closeForm
}: Props) {
  const initialState = selectedBus ?? {
    id: "",
    fullname: "",
    phoneNum: 0,
    busNum: 0,
  };

  const [bus, setBus] = useState(initialState);

  function handleSubmit() {
    createOrEdit(bus);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBus({ ...bus, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={bus.fullname}
          placeholder="Fullname"
          name="fullname"
          onChange={handleInputChange}
        />
        <Form.Input
          value={bus.phoneNum || null}
          placeholder="Phone Number"
          name="phoneNum"
          onChange={handleInputChange}
        />
        <Form.Input
          value={bus.busNum || null}
          placeholder="Bus Number"
          name="busNum"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeForm} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
