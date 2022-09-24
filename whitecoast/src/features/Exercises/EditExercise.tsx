import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Exercise } from "../../app/models/exercise";

interface Props {
  exercise: Exercise | undefined;
  createOrEdit: (exercise: Exercise) => void;
  cancelSelectExercise: () => void;
  editExercise: () => void;
  //submitting:boolean;
}

export default function EditExercise({
  exercise: selectedExercise,
  createOrEdit,
  cancelSelectExercise,
  editExercise,
}: Props) {
  const initialState = selectedExercise ?? {
    id: "",
    name: "",
    location: "",
    time: ""
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
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={exercise.location}
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          type="time"
          value={exercise.time}
          name="time"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Edit" />
        <Button
          onClick={editExercise}
          floated="left"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
