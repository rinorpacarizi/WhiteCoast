import { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Team } from "../../../app/models/team";
import Teams from "./Teams";
import CreateTeam from "./CreateTeam";
import { v4 as uuid } from "uuid";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function TeamPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(
    undefined
  );
  const [openEdit, setOpenEdit] = useState(false);

  const [loading, setLoading] = useState(true);
  //const [submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.Teams.list().then((response) => {
      let teams: Team[] = [];
      response.forEach((team) => {
       // busline.startTime = busline.startTime.split("T")[0];
       // busline.endTime = busline.endTime.split("T")[0];
       teams.push(team);
      });
      setTeams(teams);
      setLoading(false);
    });
  }, []);

  function handleSelectTeam(id: string) {
    setSelectedTeam(teams.find((x) => x.id === id));
  }

  function handleCancelSelectTeam() {
    setSelectedTeam(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditTeam(team: Team) {
    // setSubmitting(true);
    if (team.id) {
      agent.Teams.update(team).then(() => {
        setTeams([...teams.filter((x) => x.id !== team.id), team]);
        setSelectedTeam(undefined);
        //  setSubmitting(false);
      });
    } else {
      team.id = uuid();
      agent.Teams.create(team).then(() => {
        setTeams([...teams, team]);
        setSelectedTeam(team);
        // setSubmitting(false);
      });
    }
    team.id
      ? setTeams([...teams.filter((x) => x.id !== team.id), team])
      : setTeams([...teams, { ...team, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedTeam(undefined);
  }
  function handleDeleteTeams(id: string) {
    agent.Teams.delete(id).then(() => {
      setTeams([...teams.filter((x) => x.id !== id)]);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem" }}>
        <Teams
          teams={teams}
          selectedTeam={selectedTeam}
          selectTeam={handleSelectTeam}
          cancelSelectTeam={handleCancelSelectTeam}
          createOrEdit={handleCreateOrEditTeam}
          deleteTeam={handleDeleteTeams}
          openEdit={openEdit}
          editForm={handleEditFormClose}
          // submitting={submitting}
        ></Teams>
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
            content="Add a Team"
          ></Button>
        }
      >
        <Modal.Header
          style={{ width: "15rem", position: "relative", left: "12rem" }}
        >
          Create a Team
        </Modal.Header>
        <CreateTeam
          team={selectedTeam}
          createOrEdit={handleCreateOrEditTeam}
          closeForm={handleCreateFormClose}
        ></CreateTeam>
      </Modal>
    </div>
  );
}
