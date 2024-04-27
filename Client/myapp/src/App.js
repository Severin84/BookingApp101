import AdminPage from './AdminPage/AdminPage';
import Home from './AdminPage/Home';
import NavBar from './AdminPage/NavBar';
import Signup from './AuthComponents/Signup';
import TripsDetails from './AdminPage/TripsDetails';
import TripsPage from './AdminPage/TripsPage';
import './App.css';
import Login from './AuthComponents/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { useState } from 'react';
import FlightsHome from './AdminPage/FlightsHome';
import Flightspage from './AdminPage/Components/Flightspage';
function App() {
  const [isLogged,setIsLogged]=useState(false);
  return (
    // <Login/>
    <>
   <BrowserRouter>
   <NavBar logged={isLogged}/>
     <Routes>
      <Route path='/login' element={<Login setIsLogged={setIsLogged}/>}/>
      <Route path="/" element={<Signup  setIsLogged={setIsLogged}/>}/>
      <Route path="/tripDetails/:id" element={<TripsDetails/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/trips/:id' element={<TripsPage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path="/flightsPage" element={<FlightsHome/>}/>
      <Route path="/flights/:src/:dest" element={<Flightspage/>}/>
     </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
