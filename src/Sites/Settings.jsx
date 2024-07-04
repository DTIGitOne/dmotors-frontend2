import { useNavigate } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import { getIdToken } from "../functions/getTokenPayload";

const Settings = () => {
   const id = getIdToken();

   const navigate = useNavigate();

   const userSettings = () => {
      navigate(`/userinformation/${id}`)
   }

   const profileSettings = () => {
      navigate(`/users/${id}`)
   }

   const deleteUser = () => {
      navigate(`/deleteuser/${id}`);
   }

   return(
      <div className=" h-screen w-screen bg-slate-100 flex flex-col">
         <MenuBar />
         <div className=" h-16 w-full"></div>
         <div className=" h-auto w-full flex flex-col justify-center items-center">
            <div onClick={userSettings} className=" h-20 bg-white rounded-3xl p-3 pl-5 shadow-lg" style={{width: "95%"}}>
               <p className=" h-1/2 font-semibold flex items-center">User information</p>
               <div className=" h-1/2 font-light flex items-center" style={{fontSize: "12px"}}>Change user details such as username and password</div>
            </div>
            <div onClick={profileSettings} className=" mt-5 h-20 bg-white rounded-3xl p-3 pl-5 shadow-lg" style={{width: "95%"}}>
               <p className=" h-1/2 font-semibold flex items-center">Profile information</p>
               <div className=" h-1/2 font-light flex items-center" style={{fontSize: "12px"}}>Change user profile details such as picture and info</div>
            </div>
            <div onClick={deleteUser} className=" mt-5 h-20 bg-white rounded-3xl p-3 pl-5 shadow-lg" style={{width: "95%"}}>
               <p className=" h-1/2 font-semibold flex items-center">Delete user</p>
               <div className=" h-1/2 font-light flex items-center" style={{fontSize: "12px"}}>Delete the current user</div>
            </div>
         </div>
      </div>
   );
}

export default Settings;