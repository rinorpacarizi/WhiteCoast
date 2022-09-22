import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Sport } from "../../app/models/sport";
import EditSport from "./EditSport";

interface Props {
    sports: Sport[];
    selectedSport: Sport | undefined;
    selectSport: (id: string) => void;
    cancelSelectSport: () => void;
    createOrEdit:(sport:Sport) =>void;
    deleteSport:(id:string)=>void;
    openEdit:boolean;
    editForm:()=>void;
}


export default function SportsList({
  sports,
  selectSport,
  selectedSport,
  cancelSelectSport,
  createOrEdit,
  deleteSport,
  openEdit,
  editForm,
}: Props) {
  const [target, setTarget] = useState("");

  function handleSportDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteSport(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {sports.map((sport) => (
            <Item key={sport.id}>
              <Item.Content>
                <Item.Header as="a">{sport.type}</Item.Header>
                <Item.Meta>Max Players: {sport.playerNum}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === sport.id}
                    name={sport.id}
                    onClick={(e) => handleSportDelete(e, sport.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editForm}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectSport(sport.id)}
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
                      Edit Sport
                    </Modal.Header>
                    <EditSport
                      sport={selectedSport}
                      createOrEdit={createOrEdit}
                      cancelSelectSport={cancelSelectSport}
                      editForm={editForm}
                    ></EditSport>
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
