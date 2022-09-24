import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Lecture } from "../../app/models/lecture";
import EditLecture from "./EditLecture";

interface Props {
  lectures: Lecture[];
  selectedLecture: Lecture | undefined;
  selectLecture: (id: string) => void;
  cancelSelectLecture: () => void;
  createOrEdit: (lecture: Lecture) => void;
  deleteLecture: (id: string) => void;
  openEdit: boolean;
  editLecture: () => void;
}

export default function ListLecture({
  lectures,
  selectLecture,
  selectedLecture,
  cancelSelectLecture,
  createOrEdit,
  deleteLecture,
  openEdit,
  editLecture,
}: Props) {
  const [target, setTarget] = useState("");

  function handleLecturesDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteLecture(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {lectures.map((lecture) => (
            <Item key={lecture.id}>
              <Item.Content>
                <Item.Header as="a">{lecture.name}</Item.Header>
                <Item.Meta>{lecture.location}</Item.Meta>
                <Item.Meta>{lecture.time}</Item.Meta>
                <Item.Meta>{lecture.proffesor}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === lecture.id}
                    name={lecture.id}
                    onClick={(e) => handleLecturesDelete(e, lecture.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editLecture}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectLecture(lecture.id)}
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
                      Edit Lecture
                    </Modal.Header>
                    <EditLecture
                      lecture={selectedLecture}
                      createOrEdit={createOrEdit}
                      cancelSelectLecture={cancelSelectLecture}
                      editLecture={editLecture}
                    ></EditLecture>
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
