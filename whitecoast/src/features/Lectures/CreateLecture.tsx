import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { Lecture } from "../../app/models/lecture";


interface Props {
  lecture: Lecture | undefined;
  createOrEdit: (lecture: Lecture) => void;
  closeLecture:()=>void;
}

export default function CreateLecture({
  lecture: selectedLecture,
  createOrEdit,
  closeLecture
}: Props) {
  const initialState = selectedLecture ?? {
    id: "",
    name: "",
    location: '',
    time:'',
    proffesor:''
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
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          value={lecture.location }
          placeholder="Location"
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          value={lecture.time}
          placeholder="Time"
          name="time"
          type="time"
          onChange={handleInputChange}
        />
        <Form.Input
          value={lecture.proffesor }
          placeholder="Rank"
          name="rank"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeLecture} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
