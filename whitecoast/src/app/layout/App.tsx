import React from 'react';
import BusMainPage from '../../features/Buses/BusMainPage';
import ExerciseMainPage from '../../features/Exercises/ExerciseMainPage';
import StaffMainPage from '../../features/FoodStaffs/StaffMainPage';
import LectureMainPage from '../../features/Lectures/LectureMainPage';
import MissionMainPage from '../../features/Missions/MissionMainPage';
import SportsMainPage from '../../features/Sports/SportsMainPage';
//import './app/layout/syle.css';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <LectureMainPage></LectureMainPage>
    </div>
  );
}

export default App;
