import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Bus } from "../../app/models/bus";

interface Props{
    bus:Bus | undefined,
    createOrEdit:(bus:Bus) =>void;
    cancelSelectBus:()=>void;
    editForm:()=>void;
    //submitting:boolean;
}

export default function EditLine({bus:selectedBus,createOrEdit,cancelSelectBus,editForm}:Props){

    const initialState = selectedBus ?? {
        id: "",
        fullname: "",
        phoneNum: 0,
        busNum: 0,
      };

  
      const [bus, setBus] = useState(initialState);

      function handleSubmit() {
        createOrEdit(bus);
      }
      function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setBus({ ...bus, [name]: value });
      }
    
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={bus.fullname} name='fullname' onChange={handleInputChange} />
            <Form.Input value={bus.busNum} name='busNum' onChange={handleInputChange}  />
            <Form.Input value={bus.phoneNum} name='phoneNum' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button  onClick={editForm} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}