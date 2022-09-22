import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Bus } from "../../app/models/bus";
import { Button, Icon, Modal } from "semantic-ui-react";
import Buses from "./Buses";
import CreateBus from "./CreateBus";
import BusPage from "./Line/BusPage";
import agent from "../../app/api/agent";

export default function BusMainPage(){
    const[buses,setBuses]=useState<Bus[]>([]);
    const [openCreate, setOpenCreate] =useState(false);

    const [selectedBus, setSelectedBus] = useState<Bus | undefined>(
      undefined
    );
    const [openEdit, setOpenEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    //const [submitting,setSubmitting]=useState(false);

    useEffect(() => {
      agent.Buses.list().then((response) => {
        setBuses(response);
        setLoading(false);
      });
    }, []);
  
    function handleSelectBus(id: string) {
        setSelectedBus(buses.find((x) => x.id === id));
      }
    
  function handleCancelSelectBus() {
    setSelectedBus(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditBus(bus: Bus) {
    // setSubmitting(true);
    if (bus.id) {
      agent.Buses.update(bus).then(() => {
        setBuses([...buses.filter((x) => x.id !== bus.id), bus]);
        setSelectedBus(undefined);
        //  setSubmitting(false);
      });
    } else {
      bus.id = uuid();
      agent.Buses.create(bus).then(() => {
        setBuses([...buses, bus]);
        setSelectedBus(bus);
        // setSubmitting(false);
      });
    }
    bus.id
      ? setBuses([...buses.filter((x) => x.id !== bus.id), bus])
      : setBuses([...buses, { ...bus, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedBus(undefined);
  }
  function handleDeleteBus(id: string) {
    agent.Buses.delete(id).then(() => {
      setBuses([...buses.filter((x) => x.id !== id)]);
    });
  }
    return(
        <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem",width:"35rem", position:'relative',top:"5rem"}}>
        
        <Buses
          buses={buses}
          selectedBus={selectedBus}
          selectBus={handleSelectBus}
          cancelSelectBus={handleCancelSelectBus}
          createOrEdit={handleCreateOrEditBus}
          deleteBus={handleDeleteBus}
          openEdit={openEdit}
          editForm={handleEditFormClose}
          // submitting={submitting}
        ></Buses>
        <div style={{width:"65rem",position:'relative',bottom:"14rem",left:'25rem'}}>

        <BusPage ></BusPage>
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
            style={{ width: "80px", height: "38px",position:'relative',bottom:'45em',right:'32rem', fontSize:"10px"}}
            content="Add a Bus"></Button>
        }
      >
        <Modal.Header style={{width:"15rem",position:"relative",left:'12rem'}} >Create  Bus</Modal.Header>
        <CreateBus  bus={selectedBus} createOrEdit={handleCreateOrEditBus} closeForm={handleCreateFormClose}></CreateBus>
      </Modal>
    </div>
    );
}