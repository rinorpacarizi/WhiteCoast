import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Exercise } from "../../app/models/exercise";
import EditExercise from "./EditExercise";

interface Props {
  exercises: Exercise[];
  selectedExercise: Exercise | undefined;
  selectExercise: (id: string) => void;
  cancelSelectExercise: () => void;
  createOrEdit: (exercise: Exercise) => void;
  deleteExercise: (id: string) => void;
  openEdit: boolean;
  editExercise: () => void;
}

export default function ListExercise({
  exercises,
  selectExercise,
  selectedExercise,
  cancelSelectExercise,
  createOrEdit,
  deleteExercise,
  openEdit,
  editExercise,
}: Props) {
  const [target, setTarget] = useState("");

  function handleExerciseDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteExercise(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {exercises.map((exercise) => (
            <Item key={exercise.id}>
              <Item.Content>
                <Item.Header as="a">{exercise.name}</Item.Header>
                <Item.Meta>{exercise.location}</Item.Meta>
                <Item.Meta>{exercise.time}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === exercise.id}
                    name={exercise.id}
                    onClick={(e) => handleExerciseDelete(e, exercise.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editExercise}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectExercise(exercise.id)}
                        floated="right"
                        content="edit"
                        color="blue"
                      />
                    }
                  >
                    <Modal.Header
                      style={{
                        width: "15rem",
                        position: "relative",
                        left: "12rem",
                      }}
                    >
                      Edit Exercise
                    </Modal.Header>
                    <EditExercise
                      exercise={selectedExercise}
                      createOrEdit={createOrEdit}
                      cancelSelectExercise={cancelSelectExercise}
                      editExercise={editExercise}
                    ></EditExercise>
                  </Modal>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
}
