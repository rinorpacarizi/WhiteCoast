import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Lecture } from "../../app/models/lecture";

interface Props {
  lecture: Lecture | undefined;
  createOrEdit: (lecture: Lecture) => void;
  cancelSelectLecture: () => void;
  editLecture: () => void;
  //submitting:boolean;
}

export default function EditLecture({
  lecture: selectedLecture,
  createOrEdit,
  cancelSelectLecture,
  editLecture,
}: Props) {
  const initialState = selectedLecture ?? {
    id: "",
    name: "",
    location: "",
    time: "",
    proffesor: "",
  };

  const [lecture, setLecture] = useState(initialState);

  function handleSubmit() {
    createOrEdit(lecture);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLecture({ ...lecture, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={lecture.name}
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={lecture.location}
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          type="time"
          value={lecture.time}
          name="time"
          onChange={handleInputChange}
        />
        <Form.Input
          value={lecture.proffesor}
          name="proffesor"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Edit" />
        <Button
          onClick={editLecture}
          floated="left"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
