import axios from "axios";
import { Team } from "../../../app/models/team";
import ListTeams from "./ListTeams";

interface Props {
  teams: Team[];
  selectedTeam: Team | undefined;
  selectTeam: (id: string) => void;
  cancelSelectTeam: () => void;
  createOrEdit: (team: Team) => void;
  deleteTeam: (id: string) => void;
  openEdit:boolean;
  editForm:()=>void;
  // submitting:boolean;
}

export default function Teams({
  teams,
  selectTeam,
  selectedTeam,
  cancelSelectTeam,
  createOrEdit,
  deleteTeam,
  openEdit,
  editForm
}: Props) {
  return (
    <div>
      <h1 style={{ marginLeft: "15rem" }}>Teams</h1>
      <ListTeams
        teams={teams}
        selectedTeam={selectedTeam}
        selectTeam={selectTeam}
        cancelSelectTeam={cancelSelectTeam}
        createOrEdit={createOrEdit}
        deleteTeam={deleteTeam}
        openEdit={openEdit}
        editForm={editForm}
      ></ListTeams>
    </div>
  );
}
