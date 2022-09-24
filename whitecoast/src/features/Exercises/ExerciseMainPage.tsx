import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Icon, Modal } from "semantic-ui-react";
import Exercises from "./Exercises";
import CreateExercise from "./CreateExercise";
import agent from "../../app/api/agent";
import { Exercise } from "../../app/models/exercise";

export default function ExerciseMainPage(){
    const[exercises,setExercises]=useState<Exercise[]>([]);
    const [openCreate, setOpenCreate] =useState(false);

    const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>(
      undefined
    );
    const [openEdit, setOpenEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    //const [submitting,setSubmitting]=useState(false);

    useEffect(() => {
      agent.Exercises.list().then((response) => {
        setExercises(response);
        setLoading(false);
      });
    }, []);
  
    function handleSelectExercise(id: string) {
        setSelectedExercise(exercises.find((x) => x.id === id));
      }
    
  function handleCancelSelectExercise() {
    setSelectedExercise(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditExercise(exercise: Exercise) {
    // setSubmitting(true);
    if (exercise.id) {
      agent.Exercises.update(exercise).then(() => {
        setExercises([...exercises.filter((x) => x.id !== exercise.id), exercise]);
        setSelectedExercise(undefined);
        //  setSubmitting(false);
      });
    } else {
      exercise.id = uuid();
      agent.Exercises.create(exercise).then(() => {
        setExercises([...exercises, exercise]);
        setSelectedExercise(exercise);
        // setSubmitting(false);
      });
    }
    exercise.id
      ? setExercises([...exercises.filter((x) => x.id !== exercise.id), exercise])
      : setExercises([...exercises, { ...exercise, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedExercise(undefined);
  }
  function handleDeleteExercises(id: string) {
    agent.Exercises.delete(id).then(() => {
      setExercises([...exercises.filter((x) => x.id !== id)]);
    });
  }
    return(
        <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem",width:"35rem", position:'relative',top:"5rem"}}>
        
        <Exercises
          exercises={exercises}
          selectedExercise={selectedExercise}
          selectExercise={handleSelectExercise}
          cancelSelectExercise={handleCancelSelectExercise}
          createOrEdit={handleCreateOrEditExercise}
          deleteExercise={handleDeleteExercises}
          openEdit={openEdit}
          editExercise={handleEditFormClose}
          // submitting={submitting}
        ></Exercises>
        <div style={{width:"65rem",position:'relative',bottom:"14rem",left:'25rem'}}>
        </div>
      </div>

     
      <Modal 
       onClose={() => setOpenCreate(false)}
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        size="tiny"
        trigger={
          <Button
            circular
            color="black"
            floated="right"
            fixed="right"
            style={{ width: "80px", height: "38px",position:'relative',bottom:'20em',right:'50rem', fontSize:"10px"}}
            content="Add an Exercise"></Button>
        }
      >
        <Modal.Header style={{width:"15rem",position:"relative",left:'12rem'}} >Create an Exercise</Modal.Header>
        <CreateExercise  exercise={selectedExercise} createOrEdit={handleCreateOrEditExercise} closeExercise={handleCreateFormClose}></CreateExercise>
      </Modal>
    </div>
    );
}