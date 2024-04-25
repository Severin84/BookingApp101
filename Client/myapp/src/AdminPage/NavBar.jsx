
import Img from "../utils/fernando-meloni-j_gnGCDQRew-unsplash.jpg"
import { useNavigate } from 'react-router-dom';

const NavBar = ({logged}) => {
    // const [openLogin,setLogin]=useState(false);
    const navigate=useNavigate();
    //backgroundImage:`url(${Img})`
  return (
    <div>
    <div style={{backgroundColor:"#000000",color:"white"}}>
        <section style={{height:"10vh",backdropFilter:"blur(4px)"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem"}}>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}} onClick={()=>navigate('/home')}>Tours</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}} onClick={()=>navigate('/flightsPage')}>Flights</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Hotels</span>
            </div>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem",marginLeft:"20rem"}}>
                {
                    !logged && 
                    <div>
                    <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#b1a2a2",width:"5rem"}} onClick={()=>navigate('/')}>Login</button>
                    <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#b1a2a2",width:"5rem"}} onClick={()=>navigate('/signup')}>SignUp</button>
                    </div>
                }
            </div>
        </div>
    </section>
    </div>
    </div>
  )
}
export default NavBar


