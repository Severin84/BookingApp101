import AdminPage from './AdminPage/AdminPage';
import Home from './AdminPage/Home';
import NavBar from './AdminPage/NavBar';
import Signup from './AuthComponents/Signup';
import TripsDetails from './AdminPage/TripsDetails';
import TripsPage from './AdminPage/TripsPage';
import './App.css';
import Login from './AuthComponents/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {
  return (
    // <Login/>
    <>
    
   <BrowserRouter>
   <NavBar/>
     <Routes>
      
      <Route path='/login' element={<Login/>}/>
      <Route path="/signUp" element={<Signup/>}/>
      <Route path="/tripDetails/:id" element={<TripsDetails/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/trips/:id' element={<TripsPage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
     </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
