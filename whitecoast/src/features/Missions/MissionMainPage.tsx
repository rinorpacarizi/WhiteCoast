import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Icon, Modal } from "semantic-ui-react";
import Missions from "./Missions";
import CreateMission from "./CreateMission";
import agent from "../../app/api/agent";
import { Mission } from "../../app/models/mission";

export default function MissionMainPage(){
    const[missions,setMissions]=useState<Mission[]>([]);
    const [openCreate, setOpenCreate] =useState(false);

    const [selectedMission, setSelectedMission] = useState<Mission | undefined>(
      undefined
    );
    const [openEdit, setOpenEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    //const [submitting,setSubmitting]=useState(false);

    useEffect(() => {
      agent.Missions.list().then((response) => {
        setMissions(response);
        setLoading(false);
      });
    }, []);
  
    function handleSelectMission(id: string) {
        setSelectedMission(missions.find((x) => x.id === id));
      }
    
  function handleCancelSelectMission() {
    setSelectedMission(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditMission(mission: Mission) {
    // setSubmitting(true);
    if (mission.id) {
      agent.Missions.update(mission).then(() => {
        setMissions([...missions.filter((x) => x.id !== mission.id), mission]);
        setSelectedMission(undefined);
        //  setSubmitting(false);
      });
    } else {
      mission.id = uuid();
      agent.Missions.create(mission).then(() => {
        setMissions([...missions, mission]);
        setSelectedMission(mission);
        // setSubmitting(false);
      });
    }
    mission.id
      ? setMissions([...missions.filter((x) => x.id !== mission.id), mission])
      : setMissions([...missions, { ...mission, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedMission(undefined);
  }
  function handleDeleteMission(id: string) {
    agent.Missions.delete(id).then(() => {
      setMissions([...missions.filter((x) => x.id !== id)]);
    });
  }
    return(
        <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem",width:"35rem", position:'relative',top:"5rem"}}>
        
        <Missions
          missions={missions}
          selectedMission={selectedMission}
          selectMission={handleSelectMission}
          cancelSelectMission={handleCancelSelectMission}
          createOrEdit={handleCreateOrEditMission}
          deleteMission={handleDeleteMission}
          openEdit={openEdit}
          editMission={handleEditFormClose}
          // submitting={submitting}
        ></Missions>
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
        <Modal.Header style={{width:"15rem",position:"relative",left:'12rem'}} >Create a Mission</Modal.Header>
        <CreateMission  mission={selectedMission} createOrEdit={handleCreateOrEditMission} closeMission={handleCreateFormClose}></CreateMission>
      </Modal>
    </div>
    );
}