import { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Modal } from "semantic-ui-react";
import { BusLine } from "../../../app/models/busLine";
import EditLine from "./EditLine";

interface Props {
  busLines: BusLine[];
  selectedLine: BusLine | undefined;
  selectLine: (id: string) => void;
  cancelSelectLine: () => void;
  createOrEdit: (busLine: BusLine) => void;
  deleteBusLine: (id: string) => void;
  openEdit:boolean;
  editForm:()=>void;
  //submitting:boolean;
}

export default function LineList({
  busLines,
  selectLine,
  selectedLine,
  cancelSelectLine,
  createOrEdit,
  deleteBusLine,
  openEdit,
  editForm
}: //submitting
Props) {
  const [target, setTarget] = useState("");

  function handleBuslineDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteBusLine(id);
  }
  return (
    <div className="div1">
      <Segment>
        <Item.Group divided>
          {busLines.map((busLine) => (
            <Item key={busLine.id}>
              <Item.Content>
                <Item.Header as="a">
                  {busLine.start} -- {busLine.end}
                </Item.Header>
                <Item.Meta>{busLine.startTime}</Item.Meta>
                <Item.Meta>{busLine.endTime}</Item.Meta>
                <Item.Extra>
                  <Button
                    loading={target === busLine.id}
                    name={busLine.id}
                    onClick={(e) => handleBuslineDelete(e, busLine.id)}
                    floated="right"
                    content="delete"
                    color="red"
                  />

                  <Modal
                    onOpen={editForm}
                    open={openEdit}
                    size="tiny"
                    trigger={
                      <Button
                        onClick={() => selectLine(busLine.id)}
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
                      Edit BusLine
                    </Modal.Header>
                    <EditLine
                      busLine={selectedLine}
                      createOrEdit={createOrEdit}
                      cancelSelectLine={cancelSelectLine}
                      editForm={editForm}
                    ></EditLine>
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
