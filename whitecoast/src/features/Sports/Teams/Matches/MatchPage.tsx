import { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Match } from "../../../../app/models/match";
import Matches from "./Matches";
import CreateMatch from "./CreateMatch";
import { v4 as uuid } from "uuid";
import agent from "../../../../app/api/agent";
import LoadingComponent from "../../../../app/layout/LoadingComponent";

export default function MatchPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatches, setSelectedMatches] = useState<Match | undefined>(
    undefined
  );
  const [openEdit, setOpenEdit] = useState(false);

  const [loading, setLoading] = useState(true);
  //const [submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.Matches.list().then((response) => {
      let matches: Match[] = [];
      response.forEach((match) => {
       matches.push(match);
      });
      setMatches(matches);
      setLoading(false);
    });
  }, []);

  function handleSelectMatch(id: string) {
    setSelectedMatches(matches.find((x) => x.id === id));
  }

  function handleCancelSelectMatch() {
    setSelectedMatches(undefined);
  }
  function handleCreateMatchClose() {
    setOpenCreate(false);
  }
  function handleEditMatchClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditMatch(match: Match) {
    // setSubmitting(true);
    if (match.id) {
      agent.Matches.update(match).then(() => {
        setMatches([...matches.filter((x) => x.id !== match.id), match]);
        setSelectedMatches(undefined);
        //  setSubmitting(false);
      });
    } else {
      match.id = uuid();
      agent.Matches.create(match).then(() => {
        setMatches([...matches, match]);
        setSelectedMatches(match);
        // setSubmitting(false);
      });
    }
    match.id
      ? setMatches([...matches.filter((x) => x.id !== match.id),match])
      : setMatches([...matches, { ...match, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedMatches(undefined);
  }
  function handleDeleteMatches(id: string) {
    agent.Matches.delete(id).then(() => {
      setMatches([...matches.filter((x) => x.id !== id)]);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem" }}>
        <Matches
          matches={matches}
          selectedMatches={selectedMatches}
          selectMatch={handleSelectMatch}
          cancelSelectMatch={handleCancelSelectMatch}
          createOrEdit={handleCreateOrEditMatch}
          deleteMatch={handleDeleteMatches}
          openEdit={openEdit}
          editMatch={handleEditMatchClose}
          // submitting={submitting}
        ></Matches>
      </div>

      <Modal
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        size="tiny"
        trigger={
          <Button
            circular
            color="black"
            floated="right"
            fixed="right"
            style={{
              width: "80px",
              height: "38px",
              position: "relative",
              bottom: "33em",
              right: "24rem",
              fontSize: "10px",
            }}
            content="Add a Match"
          ></Button>
        }
      >
        <Modal.Header
          style={{ width: "15rem", position: "relative", left: "12rem" }}
        >
          Create a Match
        </Modal.Header>
        <CreateMatch
          match={selectedMatches}
          createOrEdit={handleCreateOrEditMatch}
          closeForm={handleCreateMatchClose}
        ></CreateMatch>
      </Modal>
    </div>
  );
}
