import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Icon, Modal } from "semantic-ui-react";
import Lectures from "./Lectures";
import CreateLecture from "./CreateLecture";
import agent from "../../app/api/agent";
import { Lecture } from "../../app/models/lecture";

export default function LectureMainPage(){
    const[lectures,setLectures]=useState<Lecture[]>([]);
    const [openCreate, setOpenCreate] =useState(false);

    const [selectedLecture, setSelectedLecture] = useState<Lecture | undefined>(
      undefined
    );
    const [openEdit, setOpenEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    //const [submitting,setSubmitting]=useState(false);

    useEffect(() => {
      agent.Lectures.list().then((response) => {
        setLectures(response);
        setLoading(false);
      });
    }, []);
  
    function handleSelectLecture(id: string) {
        setSelectedLecture(lectures.find((x) => x.id === id));
      }
    
  function handleCancelSelectLecture() {
    setSelectedLecture(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditLecture(lecture: Lecture) {
    // setSubmitting(true);
    if (lecture.id) {
      agent.Lectures.update(lecture).then(() => {
        setLectures([...lectures.filter((x) => x.id !== lecture.id), lecture]);
        setSelectedLecture(undefined);
        //  setSubmitting(false);
      });
    } else {
      lecture.id = uuid();
      agent.Lectures.create(lecture).then(() => {
        setLectures([...lectures, lecture]);
        setSelectedLecture(lecture);
        // setSubmitting(false);
      });
    }
    lecture.id
      ? setLectures([...lectures.filter((x) => x.id !== lecture.id), lecture])
      : setLectures([...lectures, { ...lecture, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedLecture(undefined);
  }
  function handleDeleteLecture(id: string) {
    agent.Lectures.delete(id).then(() => {
      setLectures([...lectures.filter((x) => x.id !== id)]);
    });
  }
    return(
        <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem",width:"35rem", position:'relative',top:"5rem"}}>
        
        <Lectures
          lectures={lectures}
          selectedLecture={selectedLecture}
          selectLecture={handleSelectLecture}
          cancelSelectLecture={handleCancelSelectLecture}
          createOrEdit={handleCreateOrEditLecture}
          deleteLecture={handleDeleteLecture}
          openEdit={openEdit}
          editLecture={handleEditFormClose}
          // submitting={submitting}
        ></Lectures>
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
            content="Add a Mission"></Button>
        }
      >
        <Modal.Header style={{width:"15rem",position:"relative",left:'12rem'}} >Create a Lecture</Modal.Header>
        <CreateLecture  lecture={selectedLecture} createOrEdit={handleCreateOrEditLecture} closeLecture={handleCreateFormClose}></CreateLecture>
      </Modal>
    </div>
    );
}