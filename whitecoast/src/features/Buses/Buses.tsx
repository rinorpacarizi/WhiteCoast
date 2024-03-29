import React from "react";
import { Bus } from "../../app/models/bus";
import BusList from "./BusList";



interface Props {
  buses: Bus[];
  selectedBus: Bus | undefined;
  selectBus: (id: string) => void;
  cancelSelectBus: () => void;
  createOrEdit:(bus:Bus) =>void;
  deleteBus:(id:string)=>void;
  openEdit:boolean;
  editForm:()=>void;
}

export default function Buses({
  buses,
  selectBus,
  selectedBus,
  cancelSelectBus,
  createOrEdit,
  deleteBus,
  openEdit,
  editForm
  // submitting:boolean;
}: Props) {
  
  return (
    <div>
      <h2 style={{marginLeft:'1.2rem'}}>Buses</h2>

      <BusList
        buses={buses}
        selectedBus={selectedBus}
        selectBus={selectBus}
        cancelSelectBus={cancelSelectBus}
        createOrEdit={createOrEdit}
        deleteBus={deleteBus}
        openEdit={openEdit}
        editForm={editForm}
      ></BusList>
    </div>
  );
}
