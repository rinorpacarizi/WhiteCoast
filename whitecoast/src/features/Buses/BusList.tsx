import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { Bus } from "../../app/models/bus";
import EditBus from "./EditBus";
import "./style.css"
interface Props {
  buses: Bus[];
  selectedBus: Bus | undefined;
  selectBus: (id: string) => void;
  cancelSelectBus: () => void;
  createOrEdit: (bus: Bus) => void;
  deleteBus: (id: string) => void;
  openEdit: boolean;
  editForm: () => void;
}

export default function BusList({
  buses,
  selectBus,
  selectedBus,
  cancelSelectBus,
  createOrEdit,
  deleteBus,
  openEdit,
  editForm,
}: Props) {
  const [target, setTarget] = useState("");

  function handleBusDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteBus(id);
  }
  return (
    <div className="div1">
      <Segment >
        <Item.Group divided style={{margin:"10px"}}>
          {buses.map((bus) => (
            <Item key={bus.id}>
              <Item.Content >
                <h4 style={{marginTop:"20px"}}>Bus Number</h4>
                <Item.Header as="a">{bus.busNum}</Item.Header>
                <h4>Bus Name</h4>
                <Item.Meta>{bus.fullname}</Item.Meta>
                <h4>Phone Number</h4>
                <Item.Meta>{bus.phoneNum}</Item.Meta>
                <Item.Extra>
                  <Button 
                    loading={target === bus.id}
                    name={bus.id}
                    onClick={(e) => handleBusDelete(e, bus.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editForm}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectBus(bus.id)}
                        floated="right"
                        content="Edit"
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
                      Edit Bus
                    </Modal.Header>
                    <EditBus
                      bus={selectedBus}
                      createOrEdit={createOrEdit}
                      cancelSelectBus={cancelSelectBus}
                      editForm={editForm}
                    ></EditBus>
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
