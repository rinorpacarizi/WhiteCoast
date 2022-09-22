import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Food } from "../../../app/models/food";

interface Props {
  food: Food | undefined;
  createOrEdit: (food: Food) => void;
  closeFood:()=>void;
}

export default function CreateFood({
  food: selectedFood,
  createOrEdit,
  closeFood
}: Props) {
  const initialState = selectedFood ?? {
    id: "",
    name: "",
    size: "",
    time: "",
    cheff: ""
  };

  const [food, setFood] = useState(initialState);

  function handleSubmit() {
    createOrEdit(food);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={food.name}
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={food.size}
          placeholder="Size"
          name="size"
          onChange={handleInputChange}
        />
        <Form.Input
          value={food.time}
          placeholder="Time"
          name="time"
          type="time"
          onChange={handleInputChange}
        />
        <Form.Input
          value={food.cheff}
          placeholder="Cheff"
          name="cheff"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeFood} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
