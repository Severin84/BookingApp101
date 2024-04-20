import AdminPage from './AdminPage/AdminPage';
import './App.css';
import Login from './AuthComponents/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {
  return (
    // <Login/>
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
