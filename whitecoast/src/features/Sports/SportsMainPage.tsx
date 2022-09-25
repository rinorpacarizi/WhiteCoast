import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Sport } from "../../app/models/sport";
import { Button, Icon, Modal, Divider } from "semantic-ui-react";
import Sports from "./Sport";
import CreateSport from "./CreateSport";
import agent from "../../app/api/agent";
import TeamPage from "./Teams/TeamPage";
import MatchPage from "./Teams/Matches/MatchPage";
import "../Buses/style.css";
import {NavLink} from 'react-router-dom'

export default function SportsMainPage() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedSport, setSelectedSport] = useState<Sport | undefined>(
    undefined
  );
  const [openEdit, setOpenEdit] = useState(false);

  const [loading, setLoading] = useState(true);
  //const [submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.Sports.list().then((response) => {
      setSports(response);
      setLoading(false);
    });
  }, []);

  function handleSelectSport(id: string) {
    setSelectedSport(sports.find((x) => x.id === id));
  }

  function handleCancelSelectSport() {
    setSelectedSport(undefined);
  }
  function handleCreateFormClose() {
    setOpenCreate(false);
  }
  function handleEditFormClose() {
    openEdit ? setOpenEdit(false) : setOpenEdit(true);
  }
  function handleCreateOrEditSport(sport: Sport) {
    // setSubmitting(true);
    if (sport.id) {
      agent.Sports.update(sport).then(() => {
        setSports([...sports.filter((x) => x.id !== sport.id), sport]);
        setSelectedSport(undefined);
        //  setSubmitting(false);
      });
    } else {
      sport.id = uuid();
      agent.Sports.create(sport).then(() => {
        setSports([...sports, sport]);
        setSelectedSport(sport);
        // setSubmitting(false);
      });
    }
    sport.id
      ? setSports([...sports.filter((x) => x.id !== sport.id), sport])
      : setSports([...sports, { ...sport, id: uuid() }]);
    setOpenCreate(false);
    setOpenEdit(false);
    setSelectedSport(undefined);
  }
  function handleDeleteSport(id: string) {
    agent.Sports.delete(id).then(() => {
      setSports([...sports.filter((x) => x.id !== id)]);
    });
  }
  return (
    <div>
      <div className="title">
        <Button as={NavLink} to='/team'>Ekipet</Button>
        <Button as={NavLink} to='/match'>Terminet</Button>
        
      </div>
      <Divider />
      <div className="buttons">
        <Button id="b1" content="Football"></Button>
        <Button id="b1"content="Basketball"></Button>
        <Button id="b1" content="Voleyball"></Button>
        <Button id="b1" content="Baseball"></Button>
      </div>
      <div>
        <div
          style={{
            marginLeft: "15rem",
            marginRight: "12rem",
            width: "35rem",
            position: "relative",
            top: "5rem",
          }}
        >
           <Sports
            sports={sports}
            selectedSport={selectedSport}
            selectSport={handleSelectSport}
            cancelSelectSport={handleCancelSelectSport}
            createOrEdit={handleCreateOrEditSport}
            deleteSport={handleDeleteSport}
            openEdit={openEdit}
            editForm={handleEditFormClose}
            // submitting={submitting}
          ></Sports> 
          <div
            style={{
              width: "65rem",
              position: "relative",
              bottom: "14rem",
              left: "15rem",
            }}
          >
          </div>

        </div>
      </div>

      <Modal
        // onClose={() => setOpenCreate(false)}
        // onOpen={() => setOpenCreate(true)}
        // open={openCreate}
        // size="tiny"
        // trigger={
        //   <Button
        //     circular
        //     color="black"
        //     floated="right"
        //     fixed="right"
        //     style={{
        //       width: "80px",
        //       height: "38px",
        //       position: "relative",
        //       bottom: "45em",
        //       right: "32rem",
        //       fontSize: "10px",
        //     }}
        //     content="Add a Sport"
        //   ></Button>
        // }
      >
        <Modal.Header
          style={{ width: "15rem", position: "relative", left: "12rem" }}
        >
          Create Sport
        </Modal.Header>
        <CreateSport
          sport={selectedSport}
          createOrEdit={handleCreateOrEditSport}
          closeForm={handleCreateFormClose}
        ></CreateSport>
      </Modal>
    </div>
  );
}
