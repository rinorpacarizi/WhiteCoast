import React from 'react';
import BusMainPage from '../../features/Buses/BusMainPage';
import SportsMainPage from '../../features/Sports/SportsMainPage';
//import './app/layout/syle.css';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <SportsMainPage></SportsMainPage>
    </div>
  );
}

export default App;
