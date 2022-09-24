import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Bus } from "../../app/models/bus";
import { Button, Container, Icon, Menu, Modal } from "semantic-ui-react";
import Buses from "./Buses";
import CreateBus from "./CreateBus";
import BusPage from "./Line/BusPage";
import agent from "../../app/api/agent";
import "./style.css"
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
          
      <div >
      <h1 className="h1b" id="h1">Orari dhe Linjat</h1>
      <Container style={{ marginTop: "5rem",display:"flex", flexDirection:"column",justifyContent:"left",marginRight: "12rem" }}>
        <Menu.Item style={{ display: "flex",marginBottom:"55px",marginLeft: "10rem"  }}>
          <Icon size="big" name="bus" />
          <h3>Linja 1</h3>
        </Menu.Item>
        <Menu.Item style={{ display: "flex" ,marginBottom:"55px",marginLeft: "10rem"}}>
          <Icon size="big" name="bus" />
          <h3>Linja 1</h3>
        </Menu.Item>
        <Menu.Item style={{ display: "flex",marginBottom:"55px" ,marginLeft: "10rem"}}>
          <Icon size="big" name="bus" />
          <h3>Linja 1</h3>
        </Menu.Item>
        <Menu.Item style={{ display: "flex",marginBottom:"55px" ,marginLeft: "10rem"}}>
          <Icon size="big" name="bus" />
          <h3>Linja 1</h3>
        </Menu.Item>
        <Menu.Item style={{ display: "flex",marginBottom:"55px",marginLeft: "10rem" }}>
          <Icon size="big" name="bus" />
          <h3>Linja 1</h3>
        </Menu.Item>
      </Container>
      
       <div style={{ marginLeft: "45rem",width:"35rem", position:'relative',bottom:"30rem"}}>
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
       </div>
        {/* <div style={{width:"65rem",position:'relative',bottom:"14rem",left:'25rem'}}>

        <BusPage ></BusPage>
        </div> */}

        </div>
      <Modal 
       onClose={() => setOpenCreate(false)}
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        size="tiny"
        trigger={
          <Button className="busButton"
            circular
            color="black"
            floated="right"
            fixed="right"
            style={{ width: "55px", height: "55px",position:'relative',bottom:'38em',right:'15rem', fontSize:"16px"}}
            content="+"></Button>
        }
      >
        <Modal.Header style={{width:"15rem",position:"relative",left:'12rem'}} >Create  Bus</Modal.Header>
        <CreateBus  bus={selectedBus} createOrEdit={handleCreateOrEditBus} closeForm={handleCreateFormClose}></CreateBus>
      </Modal>
    </div>
    
    );
}