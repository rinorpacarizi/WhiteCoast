import { Exercise } from "../../app/models/exercise";
import ListExercise from "./ListExercises";



interface Props {
  exercises: Exercise[];
  selectedExercise: Exercise | undefined;
  selectExercise: (id: string) => void;
  cancelSelectExercise: () => void;
  createOrEdit:(exercise:Exercise) =>void;
  deleteExercise:(id:string)=>void;
  openEdit:boolean;
  editExercise:()=>void;
}

export default function Exercises({
  exercises,
  selectExercise,
  selectedExercise,
  cancelSelectExercise,
  createOrEdit,
  deleteExercise,
  openEdit,
  editExercise
  // submitting:boolean;
}: Props) {
  
  return (
    <div>
      <h1 style={{marginLeft:'15rem'}}>Exercises</h1>

      <ListExercise
        exercises={exercises}
        selectedExercise={selectedExercise}
        selectExercise={selectExercise}
        cancelSelectExercise={cancelSelectExercise}
        createOrEdit={createOrEdit}
        deleteExercise={deleteExercise}
        openEdit={openEdit}
        editExercise={editExercise}
      ></ListExercise>
    </div>
  );
}
