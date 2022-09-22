import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { FoodStaff } from "../../app/models/foodStaff";
import EditStaff from "./EditStaff";

interface Props {
  staffs: FoodStaff[];
  selectedStaff: FoodStaff | undefined;
  selectStaff: (id: string) => void;
  cancelSelectStaff: () => void;
  createOrEdit: (foodStaff: FoodStaff) => void;
  deleteStaff: (id: string) => void;
  openEdit: boolean;
  editStaff: () => void;
}

export default function ListStaff({
  staffs,
  selectStaff,
  selectedStaff,
  cancelSelectStaff,
  createOrEdit,
  deleteStaff,
  openEdit,
  editStaff,
}: Props) {
  const [target, setTarget] = useState("");

  function handleStaffDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteStaff(id);
  }
  return (
    <div>
      <Segment>
        <Item.Group divided>
          {staffs.map((staff) => (
            <Item key={staff.id}>
              <Item.Content>
                <Item.Header as="a">{staff.fullName}</Item.Header>
                <Item.Meta>{staff.phoneNum}</Item.Meta>
                <Item.Meta>{staff.role}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === staff.id}
                    name={staff.id}
                    onClick={(e) => handleStaffDelete(e, staff.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editStaff}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectStaff(staff.id)}
                        floated="right"
                        content="edit"
                        color="blue"
                      />
                    }
                  >
                    <Modal.Header
                      style={{
                        width: "15rem",
                        position: "relative",
                        left: "12rem",
                      }}
                    >
                      Edit Staff
                    </Modal.Header>
                    <EditStaff
                      staff={selectedStaff}
                      createOrEdit={createOrEdit}
                      cancelSelectStaff={cancelSelectStaff}
                      editStaff={editStaff}
                    ></EditStaff>
                  </Modal>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
}
