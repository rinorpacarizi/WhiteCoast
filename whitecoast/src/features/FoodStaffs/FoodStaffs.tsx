import React from "react";
import { FoodStaff } from "../../app/models/foodStaff";
import ListStaff from "./ListStaff";



interface Props {
  staffs: FoodStaff[];
  selectedStaff: FoodStaff | undefined;
  selectStaff: (id: string) => void;
  cancelSelectStaff: () => void;
  createOrEdit:(bus:FoodStaff) =>void;
  deleteStaff:(id:string)=>void;
  openEdit:boolean;
  editStaff:()=>void;
}

export default function FoodStaffs({
  staffs,
  selectStaff,
  selectedStaff,
  cancelSelectStaff,
  createOrEdit,
  deleteStaff,
  openEdit,
  editStaff
  // submitting:boolean;
}: Props) {
  
  return (
    <div>
      <h1 style={{marginLeft:'15rem'}}>Staff</h1>

      <ListStaff
        staffs={staffs}
        selectedStaff={selectedStaff}
        selectStaff={selectStaff}
        cancelSelectStaff={cancelSelectStaff}
        createOrEdit={createOrEdit}
        deleteStaff={deleteStaff}
        openEdit={openEdit}
        editStaff={editStaff}
      ></ListStaff>
    </div>
  );
}
