import React from "react";
import { Sport } from "../../app/models/sport";
import SportsList from "./SportsList";




interface Props {
  sports: Sport[];
  selectedSport: Sport | undefined;
  selectSport: (id: string) => void;
  cancelSelectSport: () => void;
  createOrEdit:(sport:Sport) =>void;
  deleteSport:(id:string)=>void;
  openEdit:boolean;
  editForm:()=>void;
}

export default function Buses({
  sports,
  selectSport,
  selectedSport,
  cancelSelectSport,
  createOrEdit,
  deleteSport,
  openEdit,
  editForm
  // submitting:boolean;
}: Props) {
  
  return (
    <div>
      <h1 style={{marginLeft:'15rem'}}>Sports</h1>

      <SportsList
        sports={sports}
        selectedSport={selectedSport}
        selectSport={selectSport}
        cancelSelectSport={cancelSelectSport}
        createOrEdit={createOrEdit}
        deleteSport={deleteSport}
        openEdit={openEdit}
        editForm={editForm}
      ></SportsList>
    </div>
  );
}
