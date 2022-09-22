import React from 'react';
import BusMainPage from '../../features/Buses/BusMainPage';
import StaffMainPage from '../../features/FoodStaffs/StaffMainPage';
import SportsMainPage from '../../features/Sports/SportsMainPage';
//import './app/layout/syle.css';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <StaffMainPage></StaffMainPage>
    </div>
  );
}

export default App;
