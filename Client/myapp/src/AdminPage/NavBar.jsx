
import Img from "../utils/fernando-meloni-j_gnGCDQRew-unsplash.jpg"
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import logo from "../utils/carolina-nichitin-5OY83OiKlNQ-unsplash.jpg"
const NavBar = ({logged}) => {
    // const [openLogin,setLogin]=useState(false);
    const navigate=useNavigate();
    //backgroundImage:`url(${Img})`
  return (
    <div>
    <div style={{backgroundColor:"#000000",color:"white"}}>
        <section style={{height:"10vh",backdropFilter:"blur(4px)",display:"flex",justifyContent:"space-between",width:"90vw"}}>
            <div style={{marginTop:"0.5rem"}}>
            <img src={logo} alt="logo"style={{height:"50px",width:"50px",borderRadius:"2.5rem",marginLeft:"4rem"}}className='cursor-pointer'/>
            </div>
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem",marginLeft:"5rem"}}>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}} onClick={()=>navigate('/home')}>Tours</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}} onClick={()=>navigate('/flightsPage')}>Flights</span>
                {/* <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Hotels</span> */}
            </div>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem",marginLeft:"20rem"}}>
                {
                    logged===false ? <div style={{width:"15rem",display:"flex",justifyContent:"space-between"}}>
                    <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#4352f5",width:"5rem",height:"3rem"}} onClick={()=>navigate('/')}>Login</button>
                    <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#4352f5",width:"5rem",height:"3rem"}} onClick={()=>navigate('/signup')}>SignUp</button>
                    </div>
                    :<div style={{fontSize:"2rem",marginTop:"1rem",marginRight:"-5rem"}}><CgProfile /></div>
                }
            </div>
        </div>
    </section>
    </div>
    </div>
  )
}
export default NavBar


