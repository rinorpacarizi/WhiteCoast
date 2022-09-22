import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { FoodStaff } from "../../app/models/foodStaff";
import { Button, Icon, Modal } from "semantic-ui-react";
import Staffs from "./FoodStaffs";
import CreateStaff from "./CreateStaff";
import FoodPage from "./Foods/FoodPage";
import agent from "../../app/api/agent";
import FoodStaffs from "./FoodStaffs";

export default function StaffMainPage(){
    const[staffs,setStaffs]=useState<FoodStaff[]>([]);
    const [openCreate, setOpenCreate] =useState(false);

    const [selectedStaff, setSelectedStaff] = useState<FoodStaff | undefined>(
      undefined
    );
    const [openEdit, setOpenEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    //const [submitting,setSubmitting]=useState(false);

    useEffect(() => {
      agent.FoodStaffs.list().then((response) => {
        setStaffs(response);
        setLoading(false);
      });
    }, []);
  
    function handleSelectStaff(id: string) {
        setSelectedStaff(staffs.find((x) => x.id === id));
      }
    
  function handleCancelSelectStaff() {
    setSelectedStaff(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditStaff(staff: FoodStaff) {
    // setSubmitting(true);
    if (staff.id) {
      agent.FoodStaffs.update(staff).then(() => {
        setStaffs([...staffs.filter((x) => x.id !== staff.id), staff]);
        setSelectedStaff(undefined);
        //  setSubmitting(false);
      });
    } else {
      staff.id = uuid();
      agent.FoodStaffs.create(staff).then(() => {
        setStaffs([...staffs, staff]);
        setSelectedStaff(staff);
        // setSubmitting(false);
      });
    }
    staff.id
      ? setStaffs([...staffs.filter((x) => x.id !== staff.id), staff])
      : setStaffs([...staffs, { ...staff, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedStaff(undefined);
  }
  function handleDeleteStaff(id: string) {
    agent.FoodStaffs.delete(id).then(() => {
      setStaffs([...staffs.filter((x) => x.id !== id)]);
    });
  }
    return(
        <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem",width:"35rem", position:'relative',top:"5rem"}}>
        
        <FoodStaffs
          staffs={staffs}
          selectedStaff={selectedStaff}
          selectStaff={handleSelectStaff}
          cancelSelectStaff={handleCancelSelectStaff}
          createOrEdit={handleCreateOrEditStaff}
          deleteStaff={handleDeleteStaff}
          openEdit={openEdit}
          editStaff={handleEditFormClose}
          // submitting={submitting}
        ></FoodStaffs>
        <div style={{width:"65rem",position:'relative',bottom:"14rem",left:'25rem'}}>

        <FoodPage ></FoodPage>
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
            content="Add a Staff"></Button>
        }
      >
        <Modal.Header style={{width:"15rem",position:"relative",left:'12rem'}} >Create Staff</Modal.Header>
        <CreateStaff  staff={selectedStaff} createOrEdit={handleCreateOrEditStaff} closeForm={handleCreateFormClose}></CreateStaff>
      </Modal>
    </div>
    );
}