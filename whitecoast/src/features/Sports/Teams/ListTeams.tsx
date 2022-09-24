import { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Team } from "../../../app/models/team";
import EditTeam from "./EditTeam";
import "../../Buses/style.css"

interface Props {
  teams: Team[];
  selectedTeam: Team | undefined;
  selectTeam: (id: string) => void;
  cancelSelectTeam: () => void;
  createOrEdit: (team: Team) => void;
  deleteTeam: (id: string) => void;
  openEdit:boolean;
  editForm:()=>void;
  //submitting:boolean;
}

export default function ListTeams({
  teams,
  selectTeam,
  selectedTeam,
  cancelSelectTeam,
  createOrEdit,
  deleteTeam,
  openEdit,
  editForm
}: //submitting
Props) {
  const [target, setTarget] = useState("");

  function handleTeamDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteTeam(id);
  }
  return (
    <div className="teamBox">
      <Segment>
        <Item.Group divided>
          {teams.map((team) => (
            <Item key={team.id}>
              <Item.Content className="sportItem">
                <Item.Header as="a">
                  {team.name}
                </Item.Header >
                <Item.Meta className="sportMeta">{team.sport}</Item.Meta>
                <Item.Meta className="sportMeta">Total Space:{team.totalSpace}</Item.Meta>
                <Item.Meta className="sportMeta">Free Space:{team.freeSpace}</Item.Meta>
                <Item.Extra>
                  <Button className="sportsBtn"
                    loading={target === team.id}
                    name={team.id}
                    onClick={(e) => handleTeamDelete(e, team.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editForm}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button className="sportsBtn"
                        onClick={() => selectTeam(team.id)}
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
                      Edit Team
                    </Modal.Header>
                    <EditTeam
                      team={selectedTeam}
                      createOrEdit={createOrEdit}
                      cancelSelectTeam={cancelSelectTeam}
                      editForm={editForm}
                    ></EditTeam>
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
