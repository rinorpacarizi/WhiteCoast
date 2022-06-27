import React from 'react';
import BusMainPage from '../../features/Buses/BusMainPage';
//import './app/layout/syle.css';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BusMainPage></BusMainPage>
    </div>
  );
}

export default App;
