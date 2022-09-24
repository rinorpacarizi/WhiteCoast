import { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { BusLine } from "../../../app/models/busLine";
import BusLines from "./BusLines";
import CreateLine from "./CreateLine";
import { v4 as uuid } from "uuid";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function BusPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const [busLines, setBusLines] = useState<BusLine[]>([]);
  const [selectedLine, setSelectedLine] = useState<BusLine | undefined>(
    undefined
  );
  const [openEdit, setOpenEdit] = useState(false);

  const [loading, setLoading] = useState(true);
  //const [submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.BusLines.list().then((response) => {
      let buslines: BusLine[] = [];
      response.forEach((busline) => {
       // busline.startTime = busline.startTime.split("T")[0];
       // busline.endTime = busline.endTime.split("T")[0];
        buslines.push(busline);
      });
      setBusLines(buslines);
      setLoading(false);
    });
  }, []);

  function handleSelectLine(id: string) {
    setSelectedLine(busLines.find((x) => x.id === id));
  }

  function handleCancelSelectLine() {
    setSelectedLine(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false):setOpenEdit(true);
  }
  function handleCreateOrEditBusLine(busLine: BusLine) {
    // setSubmitting(true);
    if (busLine.id) {
      agent.BusLines.update(busLine).then(() => {
        setBusLines([...busLines.filter((x) => x.id !== busLine.id), busLine]);
        setSelectedLine(undefined);
        //  setSubmitting(false);
      });
    } else {
      busLine.id = uuid();
      agent.BusLines.create(busLine).then(() => {
        setBusLines([...busLines, busLine]);
        setSelectedLine(busLine);
        // setSubmitting(false);
      });
    }
    busLine.id
      ? setBusLines([...busLines.filter((x) => x.id !== busLine.id), busLine])
      : setBusLines([...busLines, { ...busLine, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedLine(undefined);
  }
  function handleDeleteBusLine(id: string) {
    agent.BusLines.delete(id).then(() => {
      setBusLines([...busLines.filter((x) => x.id !== id)]);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <div style={{ marginLeft: "15rem", marginRight: "12rem" }}>
        <BusLines
          busLines={busLines}
          selectedLine={selectedLine}
          selectLine={handleSelectLine}
          cancelSelectLine={handleCancelSelectLine}
          createOrEdit={handleCreateOrEditBusLine}
          deleteBusLine={handleDeleteBusLine}
          openEdit={openEdit}
          editForm={handleEditFormClose}
          // submitting={submitting}
        ></BusLines>
      </div>

      <Modal
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        size="tiny"
        trigger={
          <Button
            circular
            color="black"
            floated="right"
            fixed="right"
            style={{
              width: "55px",
              height: "55px",
              position: "relative",
              bottom: "10.5em",
              right: "15rem",
              fontSize: "16px",
            }}
            content="+"
          ></Button>
        }
      >
        <Modal.Header
          style={{ width: "15rem", position: "relative", left: "12rem" }}
        >
          Create BusLine
        </Modal.Header>
        <CreateLine
          busLine={selectedLine}
          createOrEdit={handleCreateOrEditBusLine}
          closeForm={handleCreateFormClose}
        ></CreateLine>
      </Modal>
    </div>
  );
}
