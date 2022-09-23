import { Mission } from "../../app/models/mission";
import ListMission from "./ListMission";



interface Props {
  missions: Mission[];
  selectedMission: Mission | undefined;
  selectMission: (id: string) => void;
  cancelSelectMission: () => void;
  createOrEdit:(mission:Mission) =>void;
  deleteMission:(id:string)=>void;
  openEdit:boolean;
  editMission:()=>void;
}

export default function Missions({
  missions,
  selectMission,
  selectedMission,
  cancelSelectMission,
  createOrEdit,
  deleteMission,
  openEdit,
  editMission
  // submitting:boolean;
}: Props) {
  
  return (
    <div>
      <h1 style={{marginLeft:'15rem'}}>Missions</h1>

      <ListMission
        missions={missions}
        selectedMission={selectedMission}
        selectMission={selectMission}
        cancelSelectMission={cancelSelectMission}
        createOrEdit={createOrEdit}
        deleteMission={deleteMission}
        openEdit={openEdit}
        editMission={editMission}
      ></ListMission>
    </div>
  );
}
