import { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Match } from "../../../../app/models/match";
import EditMatch from "./EditMatch";

interface Props {
  matches: Match[];
  selectedMatch: Match | undefined;
  selectMatch: (id: string) => void;
  cancelSelectMatch: () => void;
  createOrEdit: (match: Match) => void;
  deleteMatch: (id: string) => void;
  openEdit:boolean;
  editMatch:()=>void;
  //submitting:boolean;
}

export default function ListMatch({
  matches,
  selectMatch,
  selectedMatch,
  cancelSelectMatch,
  createOrEdit,
  deleteMatch,
  openEdit,
  editMatch
}: //submitting
Props) {
  const [target, setTarget] = useState("");

  function handleMatchDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteMatch(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {matches.map((match) => (
            <Item key={match.id}>
              <Item.Content>
                <Item.Header as="a">
                  {match.name}
                </Item.Header>
                <Item.Meta>{match.sport}</Item.Meta>
                <Item.Meta>Location:{match.location}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === match.id}
                    name={match.id}
                    onClick={(e) => handleMatchDelete(e, match.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editMatch}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectMatch(match.id)}
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
                      Edit Match
                    </Modal.Header>
                    <EditMatch
                      match={selectedMatch}
                      createOrEdit={createOrEdit}
                      cancelSelectMatch={cancelSelectMatch}
                      editForm={editMatch}
                    ></EditMatch>
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
