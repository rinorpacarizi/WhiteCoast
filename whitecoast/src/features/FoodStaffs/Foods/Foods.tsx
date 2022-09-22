import axios from "axios";
import { Food } from "../../../app/models/food";
import ListFood from "./ListFood";

interface Props {
  foods: Food[];
  selectedFood: Food | undefined;
  selectFood: (id: string) => void;
  cancelSelectFood: () => void;
  createOrEdit: (food: Food) => void;
  deleteFood: (id: string) => void;
  openEdit:boolean;
  editFood:()=>void;
  // submitting:boolean;
}

export default function Foods({
  foods,
  selectFood,
  selectedFood,
  cancelSelectFood,
  createOrEdit,
  deleteFood,
  openEdit,
  editFood
}: Props) {
  return (
    <div>
      <h1 style={{ marginLeft: "15rem" }}>Lines</h1>
      <ListFood
        foods={foods}
        selectedFood={selectedFood}
        selectFood={selectFood}
        cancelSelectFood={cancelSelectFood}
        createOrEdit={createOrEdit}
        deleteFood={deleteFood}
        openEdit={openEdit}
        editFood={editFood}
      ></ListFood>
    </div>
  );
}
