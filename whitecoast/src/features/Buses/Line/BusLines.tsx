import axios from "axios";
import { BusLine } from "../../../app/models/busLine";
import LineList from "./LineList";

interface Props {
  busLines: BusLine[];
  selectedLine: BusLine | undefined;
  selectLine: (id: string) => void;
  cancelSelectLine: () => void;
  createOrEdit: (busLine: BusLine) => void;
  deleteBusLine: (id: string) => void;
  openEdit:boolean;
  editForm:()=>void;
  // submitting:boolean;
}

export default function BusLines({
  busLines,
  selectLine,
  selectedLine,
  cancelSelectLine,
  createOrEdit,
  deleteBusLine,
  openEdit,
  editForm
}: Props) {
  return (
    <div>
      <h1 style={{ marginLeft: "2rem" }}>Lines</h1>
      <LineList
        busLines={busLines}
        selectedLine={selectedLine}
        selectLine={selectLine}
        cancelSelectLine={cancelSelectLine}
        createOrEdit={createOrEdit}
        deleteBusLine={deleteBusLine}
        openEdit={openEdit}
        editForm={editForm}
      ></LineList>
    </div>
  );
}
