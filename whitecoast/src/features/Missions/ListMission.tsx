import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Mission } from "../../app/models/mission";
import EditMission from "./EditMission";

interface Props {
  missions: Mission[];
  selectedMission: Mission | undefined;
  selectMission: (id: string) => void;
  cancelSelectMission: () => void;
  createOrEdit: (mission: Mission) => void;
  deleteMission: (id: string) => void;
  openEdit: boolean;
  editMission: () => void;
}

export default function ListMission({
  missions,
  selectMission,
  selectedMission,
  cancelSelectMission,
  createOrEdit,
  deleteMission,
  openEdit,
  editMission,
}: Props) {
  const [target, setTarget] = useState("");

  function handleMissionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteMission(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {missions.map((mission) => (
            <Item key={mission.id}>
              <Item.Content>
                <Item.Header as="a">{mission.name}</Item.Header>
                <Item.Meta>{mission.location}</Item.Meta>
                <Item.Meta>{mission.time}</Item.Meta>
                <Item.Meta>{mission.rank}</Item.Meta>
                <Item.Meta>{mission.priority}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === mission.id}
                    name={mission.id}
                    onClick={(e) => handleMissionDelete(e, mission.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editMission}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectMission(mission.id)}
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
                      Edit Mission
                    </Modal.Header>
                    <EditMission
                      mission={selectedMission}
                      createOrEdit={createOrEdit}
                      cancelSelectMission={cancelSelectMission}
                      editMission={editMission}
                    ></EditMission>
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
