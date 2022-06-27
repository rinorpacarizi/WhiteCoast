import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { BusLine } from "../../../app/models/busLine";

interface Props{
    busLine:BusLine | undefined,
    createOrEdit:(busLine:BusLine) =>void;
    cancelSelectLine:()=>void;
    editForm:()=>void;
    //submitting:boolean;
}

export default function EditLine({busLine:selectedLine,createOrEdit,cancelSelectLine,editForm}:Props){

    const initialState = selectedLine ?? {
        id:'',
        start:'',
        end:'',
        startTime:'',
        endTime:'',
        bus:""
    }

    const [busLine,setBusLine] = useState(initialState);
   
    function handleSubmit(){
       createOrEdit(busLine);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name,value}=event.target;
        setBusLine({...busLine,[name]:value})
    }
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={busLine.start} name='start' onChange={handleInputChange} />
            <Form.Input value={busLine.end} name='end' onChange={handleInputChange}  />
            <Form.Input type="time" value={busLine.startTime} name='startTime' onChange={handleInputChange}  />
            <Form.Input type="time" value={busLine.endTime} name='endTime' onChange={handleInputChange}  />
            <Form.Input  value={busLine.bus} name='endTime' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button onClick={editForm} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}