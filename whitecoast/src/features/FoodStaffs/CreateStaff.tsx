import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal, Segment } from "semantic-ui-react";
import { FoodStaff } from "../../app/models/foodStaff";


interface Props {
  staff: FoodStaff | undefined;
  createOrEdit: (foodstaff: FoodStaff) => void;
  closeForm:()=>void;
}

export default function CreateStaff({
  staff: selectedStaff,
  createOrEdit,
  closeForm
}: Props) {
  const initialState = selectedStaff ?? {
    id: "",
    fullName: "",
    phoneNum: 0,
    role:'',
  };

  const [staff, setStaff] = useState(initialState);

  function handleSubmit() {
    createOrEdit(staff);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setStaff({ ...staff, [name]: value });
  }

  return (
    <Segment clearing>
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <Form.Input
          value={staff.fullName}
          placeholder="Fullname"
          name="fullName"
          onChange={handleInputChange}
        />
        <Form.Input
          value={staff.phoneNum || null}
          placeholder="Phone Number"
          name="phoneNum"
          onChange={handleInputChange}
        />
        <Form.Input
          value={staff.role || null}
          placeholder="Role"
          name="role"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Create" />
        <Button onClick={closeForm} floated="left" type="submit" content="Cancel" />
      </Form>
    </Segment>
  );
}
