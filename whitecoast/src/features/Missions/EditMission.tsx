import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Mission } from "../../app/models/mission";

interface Props{
    mission:Mission | undefined,
    createOrEdit:(mission:Mission) =>void;
    cancelSelectMission:()=>void;
    editMission:()=>void;
    //submitting:boolean;
}

export default function EditMission({mission:selectedMission,createOrEdit,cancelSelectMission,editMission}:Props){

    const initialState = selectedMission ?? {
        id: "",
        name: "",
        location: '',
        time: '',
        rank:'',
        priority:''
      };

  
      const [mission, setMission] = useState(initialState);

      function handleSubmit() {
        createOrEdit(mission);
      }
      function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setMission({ ...mission, [name]: value });
      }
    
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={mission.name} name='name' onChange={handleInputChange} />
            <Form.Input value={mission.location} name='location' onChange={handleInputChange}  />
            <Form.Input type="time" value={mission.time} name='time' onChange={handleInputChange}  />
            <Form.Input value={mission.rank} name='rank' onChange={handleInputChange}  />
            <Form.Input value={mission.priority} name='priority' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button  onClick={editMission} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}