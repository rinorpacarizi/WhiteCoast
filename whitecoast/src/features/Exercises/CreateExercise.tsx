import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Exercise } from "../../app/models/exercise";


interface Props {
  exercise: Exercise | undefined;
  createOrEdit: (exercise: Exercise) => void;
  closeExercise:()=>void;
}

export default function CreateExercise({
  exercise: selectedExercise,
  createOrEdit,
  closeExercise
}: Props) {
  const initialState = selectedExercise ?? {
    id: "",
    name: "",
    location: '',
    time:'',
  };

  const [exercise, setExercise] = useState(initialState);

  function handleSubmit() {
    createOrEdit(exercise);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setExercise({ ...exercise, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={exercise.name}
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={exercise.location }
          placeholder="Location"
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          value={exercise.time}
          placeholder="Time"
          name="time"
          type="time"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeExercise} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
