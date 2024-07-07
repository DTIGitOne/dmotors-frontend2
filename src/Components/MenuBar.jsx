import DMotorsLogo from "../SVG/DMotorsLogo";
import MenuLogo from "../SVG/MenuLogo";
import UserIcon from "../SVG/UserIcon";
import SideBar from "./SideBar";
import { ScrollToTopComponent } from "../Constants/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getIdToken, getRoleToken } from "../functions/getTokenPayload";
import { getUser } from "../API/API";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged } from "../Redux/Slices/User";
import '../CustomCSS/MenuBar.css';

const MenuBar = () => {
   const [pfpUser, setPfpUser] = useState("");
   
   const token = localStorage.getItem('authorization');

   const userId = getIdToken();

   const dispatch = useDispatch();
   const [isAdmin, setIsAdmin] = useState(false);

   const loggedIn = useSelector((state) => state.user.userLogged);
 
   const role = getRoleToken();
 
   useEffect(() => {
     if (role === "ADMIN") {
       setIsAdmin(true)
     } else {
       setIsAdmin(false);
     }
   }, []);
  
   const location = useLocation();
   const { pathname } = location;

   const logoutUser = () => {
      localStorage.removeItem('authorization');
      window.location.reload();
    }
  
    const redirectFunctionMain = () => {
      if (pathname === "/Main") {
      } else {
        navigate("/Main");
      } 
    }
  
    const redirectFunctionAbout = () => {
      if (pathname === "/About") {
      } else {
        navigate("/About");
      } 
    }
  
    const redirectFunctionContact = () => {
      if (pathname === "/Contact") {
      } else {
        navigate("/Contact");
      } 
    }
  
    const redirectFunctionSettings = () => {
      if (pathname === "/settings") {
      } else {
        navigate("/settings");
      } 
    }
  
    const redirectFunctionAdmin = () => {
      if (pathname === "/Admin/Main") {
      } else {
        navigate("/Admin/Main");
      } 
    }
   
   useEffect(() => {
      if (token) {
         const getData = async () => {
            try {
               dispatch(setIsLogged(true))
               const response = await getUser(userId);
               
               setPfpUser(response.data.pfp);
            } catch(e) {
               dispatch(setIsLogged(false))
               console.log(e);
            }
         }
      
         getData();
      }
   }, []);

   const navigate = useNavigate();

   return (
      <div className="menubar fixed top-0 left-0 bg-white w-full flex justify-between items-center p-4 pt-5" style={{ height: '5%' }}>
         <div id="sideBarPhone">
          <SideBar />
         </div>
         <div id="screenBar">
         <div id='sideBox' className=' gap-10 text-2xl font-light h-auto w-full flex p-1 pt-2 pl-0 relative'>
            <div className=' btn-one' onClick={redirectFunctionMain}>
              <span>Search</span>
            </div>
            <div className=' btn-one' onClick={redirectFunctionAbout}>
              <span>About us</span>
            </div>
            <div className=' btn-one' onClick={redirectFunctionContact}>
              <span >Contact</span>
            </div>
         </div>
         </div>
         <div id="phoneMidLogo" className=" cursor-pointer z-20" onClick={ScrollToTopComponent}>
          <DMotorsLogo />
         </div>
         <div id="userBoxMonitor">
         {loggedIn ? (
            <div id="screenUserItems">
            {isAdmin ? (<div className=" mr-6"><button onClick={redirectFunctionAdmin} className='btn-one' style={{color: "#1070FF"}}>Admin Panel</button></div>) : null}
            <button onClick={redirectFunctionSettings} className=' btn-one'>Settings</button>
            <button onClick={logoutUser} className=' btn-one'>Log out</button>
           </div>
         ) : (
            null
         )}
         {loggedIn ? <div id="profileUser" className=" cursor-pointer h-7 w-7 rounded-full object-cover overflow-hidden bg-black" onClick={() => navigate(`/users/${userId}`)}><img className=" h-full w-full object-cover" src={pfpUser}></img></div> : <div className=" cursor-pointer" onClick={() => navigate(`/Login`)}><UserIcon /></div>}
         </div>
         <div id="phoneItemsMenu">
         {loggedIn ? (
            <div id="screenUserItems">
            {isAdmin ? (<div className=" mr-6"><button onClick={redirectFunctionAdmin} className='btn-one' style={{color: "#1070FF"}}>Admin Panel</button></div>) : null}
            <button onClick={redirectFunctionSettings} className=' btn-one'>Settings</button>
            <button onClick={logoutUser} className=' btn-one'>Log out</button>
           </div>
         ) : (
            null
         )}
         {loggedIn ? <div id="profileUser" className=" cursor-pointer h-7 w-7 rounded-full object-cover overflow-hidden bg-black" onClick={() => navigate(`/users/${userId}`)}><img className=" h-full w-full object-cover" src={pfpUser}></img></div> : <div className=" cursor-pointer" onClick={() => navigate(`/Login`)}><UserIcon /></div>}
         </div>
      </div>
   );
}

export default MenuBar;