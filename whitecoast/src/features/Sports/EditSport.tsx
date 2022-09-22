import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Sport } from "../../app/models/sport";

interface Props{
    sport:Sport | undefined,
    createOrEdit:(sport:Sport) =>void;
    cancelSelectSport:()=>void;
    editForm:()=>void;
    //submitting:boolean;
}

export default function EditSport({sport:selectedSport,createOrEdit,cancelSelectSport,editForm}:Props){

    const initialState = selectedSport ?? {
        id: "",
        type: "",
        playerNum: 0,
      };

  
      const [sport, setSport] = useState(initialState);

      function handleSubmit() {
        createOrEdit(sport);
      }
      function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setSport({ ...sport, [name]: value });
      }
    
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={sport.type} name='type' onChange={handleInputChange} />
            <Form.Input value={sport.playerNum} name='playerNum' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button  onClick={editForm} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}