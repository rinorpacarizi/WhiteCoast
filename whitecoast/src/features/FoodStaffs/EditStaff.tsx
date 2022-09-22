import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { FoodStaff } from "../../app/models/foodStaff";

interface Props{
    staff:FoodStaff | undefined,
    createOrEdit:(staff:FoodStaff) =>void;
    cancelSelectStaff:()=>void;
    editStaff:()=>void;
    //submitting:boolean;
}

export default function EditStaff({staff:selectedStaff,createOrEdit,cancelSelectStaff,editStaff}:Props){

    const initialState = selectedStaff ?? {
        id: "",
        fullName: "",
        phoneNum: 0,
        role: '',
      };

  
      const [staff, setStaff] = useState(initialState);

      function handleSubmit() {
        createOrEdit(staff);
      }
      function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setStaff({ ...staff, [name]: value });
      }
    
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={staff.fullName} name='fullName' onChange={handleInputChange} />
            <Form.Input value={staff.phoneNum} name='phoneNum' onChange={handleInputChange}  />
            <Form.Input value={staff.role} name='role' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button  onClick={editStaff} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}