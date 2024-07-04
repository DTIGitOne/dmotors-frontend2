import DMotorsLogo from "../SVG/DMotorsLogo";
import MenuLogo from "../SVG/MenuLogo";
import UserIcon from "../SVG/UserIcon";
import SideBar from "./SideBar";
import { ScrollToTopComponent } from "../Constants/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIdToken } from "../functions/getTokenPayload";
import { getUser } from "../API/API";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged } from "../Redux/Slices/User";

const MenuBar = () => {
   const [pfpUser, setPfpUser] = useState("");

   const loggedIn = useSelector((state) => state.user.userLogged);
   
   const token = localStorage.getItem('authorization');

   const userId = getIdToken();

   const dispatch = useDispatch();
   
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
         <SideBar />
         <div className=" z-20" onClick={ScrollToTopComponent}>
          <DMotorsLogo />
         </div>
         {loggedIn ? <div className=" h-7 w-7 rounded-full object-cover overflow-hidden bg-black" onClick={() => navigate(`/users/${userId}`)}><img className=" h-full w-full object-cover" src={pfpUser}></img></div> : <div onClick={() => navigate(`/Login`)}><UserIcon /></div>}
      </div>
   );
}

export default MenuBar;