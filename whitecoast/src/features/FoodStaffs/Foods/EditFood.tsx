import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Food } from "../../../app/models/food";

interface Props{
    food:Food | undefined,
    createOrEdit:(food:Food) =>void;
    cancelSelectFood:()=>void;
    editFood:()=>void;
    //submitting:boolean;
}

export default function EditFood({food:selectedFood,createOrEdit,cancelSelectFood,editFood}:Props){

    const initialState = selectedFood ?? {
        id:'',
        name:'',
        time:'',
        size:'',
        cheff:''
    }

    const [food,setFood] = useState(initialState);
   
    function handleSubmit(){
       createOrEdit(food);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name,value}=event.target;
        setFood({...food,[name]:value})
    }
   
    return(
        <Segment clearing>

        <Form onSubmit={handleSubmit} autoComplete='off'  style={{width:"25rem",position:"relative",left:'6rem'}}>
            <Form.Input value={food.name} name='name' onChange={handleInputChange} />
            <Form.Input value={food.size} name='size' onChange={handleInputChange}  />
            <Form.Input value={food.time} name='time' onChange={handleInputChange}  />
            <Form.Input value={food.cheff} name='cheff' onChange={handleInputChange}  />
            <Button floated="right" positive type="submit" content="Edit"/>
            <Button onClick={editFood} floated="left" type="submit" content="Cancel"/>
        </Form>
    </Segment>
    )
}