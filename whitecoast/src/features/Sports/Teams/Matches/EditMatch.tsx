import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Match } from "../../../../app/models/match";

interface Props{
    match:Match | undefined,
    createOrEdit:(match:Match) =>void;
    cancelSelectMatch:()=>void;
    editForm:()=>void;
    //submitting:boolean;
}

export default function EditMatch({match:selectedMatch,createOrEdit,cancelSelectMatch,editForm}:Props){

    const initialState = selectedMatch ?? {
        id:'',
        name:'',
        sport:'',
        team:'',
        location:''
    }

    const [match,setMatch] = useState(initialState);
   
    function handleSubmit(){
       createOrEdit(match);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name,value}=event.target;
        setMatch({...match,[name]:value})
    }
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={match.name} name='name' onChange={handleInputChange} />
            <Form.Input value={match.sport} name='sport' onChange={handleInputChange}  />
            <Form.Input value={match.team} name='team' onChange={handleInputChange}  />
            <Form.Input value={match.location} name='location' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button onClick={editForm} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}