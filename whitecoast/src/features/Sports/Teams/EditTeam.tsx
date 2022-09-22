import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Team } from "../../../app/models/team";

interface Props{
    team:Team | undefined,
    createOrEdit:(team:Team) =>void;
    cancelSelectTeam:()=>void;
    editForm:()=>void;
    //submitting:boolean;
}

export default function EditTeam({team:selectedTeam,createOrEdit,cancelSelectTeam,editForm}:Props){

    const initialState = selectedTeam ?? {
        id:'',
        name:'',
        sport:'',
        totalSpace:0,
        freeSpace:0
    }

    const [team,setTeam] = useState(initialState);
   
    function handleSubmit(){
       createOrEdit(team);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name,value}=event.target;
        setTeam({...team,[name]:value})
    }
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={team.name} name='name' onChange={handleInputChange} />
            <Form.Input value={team.sport} name='sport' onChange={handleInputChange}  />
            <Form.Input value={team.totalSpace} name='totalSpace' onChange={handleInputChange}  />
            <Form.Input value={team.freeSpace} name='freeSpace' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button onClick={editForm} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}