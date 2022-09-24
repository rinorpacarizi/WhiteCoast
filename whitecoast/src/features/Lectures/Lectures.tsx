import { Lecture } from "../../app/models/lecture";
import ListLecture from "./ListLectures";

interface Props {
  lectures: Lecture[];
  selectedLecture: Lecture | undefined;
  selectLecture: (id: string) => void;
  cancelSelectLecture: () => void;
  createOrEdit:(lectures:Lecture) =>void;
  deleteLecture:(id:string)=>void;
  openEdit:boolean;
  editLecture:()=>void;
}

export default function Lectures({
  lectures,
  selectLecture,
  selectedLecture,
  cancelSelectLecture,
  createOrEdit,
  deleteLecture,
  openEdit,
  editLecture
  // submitting:boolean;
}: Props) {
  
  return (
    <div>
      <h1 style={{marginLeft:'15rem'}}>Lectures</h1>

      <ListLecture
        lectures={lectures}
        selectedLecture={selectedLecture}
        selectLecture={selectLecture}
        cancelSelectLecture={cancelSelectLecture}
        createOrEdit={createOrEdit}
        deleteLecture={deleteLecture}
        openEdit={openEdit}
        editLecture={editLecture}
      ></ListLecture>
    </div>
  );
}
