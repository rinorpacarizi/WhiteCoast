import React from "react";
import BusMainPage from "../../features/Buses/BusMainPage";
import ExerciseMainPage from "../../features/Exercises/ExerciseMainPage";
import StaffMainPage from "../../features/FoodStaffs/StaffMainPage";
import LectureMainPage from "../../features/Lectures/LectureMainPage";
import MissionMainPage from "../../features/Missions/MissionMainPage";
import SportsMainPage from "../../features/Sports/SportsMainPage";
import {Routes,Route} from "react-router-dom";
//import './app/layout/syle.css';
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import TeamPage from "../../features/Sports/Teams/TeamPage";
import MatchPage from "../../features/Sports/Teams/Matches/MatchPage";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>  
        
      <Route path='/' element={<LectureMainPage />}/> 
      <Route path='/bus' element={<BusMainPage />}/> 
      <Route path='/food' element={<StaffMainPage />}/> 
      <Route path='/team' element={<SportsMainPage />}/> 
      <Route path='/match' element={<MatchPage />}/> 
      </Routes>
    </div>
  );
}

export default App;
