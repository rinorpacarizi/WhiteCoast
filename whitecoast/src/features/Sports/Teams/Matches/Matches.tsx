import axios from "axios";
import { Match } from "../../../../app/models/match";
import ListMatches from "./ListMatches";

interface Props {
  matches: Match[];
  selectedMatches: Match | undefined;
  selectMatch: (id: string) => void;
  cancelSelectMatch: () => void;
  createOrEdit: (match: Match) => void;
  deleteMatch: (id: string) => void;
  openEdit:boolean;
  editMatch:()=>void;
  // submitting:boolean;
}

export default function Matches({
  matches,
  selectMatch,
  selectedMatches,
  cancelSelectMatch,
  createOrEdit,
  deleteMatch,
  openEdit,
  editMatch
}: Props) {
  return (
    <div>
      <h1 style={{ marginLeft: "15rem" }}>Matches</h1>
      <ListMatches
        matches={matches}
        selectedMatch={selectedMatches}
        selectMatch={selectMatch}
        cancelSelectMatch={cancelSelectMatch}
        createOrEdit={createOrEdit}
        deleteMatch={deleteMatch}
        openEdit={openEdit}
        editMatch={editMatch}
      ></ListMatches>
    </div>
  );
}
