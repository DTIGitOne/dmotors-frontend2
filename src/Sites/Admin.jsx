import { useNavigate } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import { useEffect } from "react";
import '../CustomCSS/Admin.css'

const AdminMain = () => {

   const navigate = useNavigate()

   useEffect(() => {
      window.scrollTo(0, 0);
     }, []);

   const handleAdminUsers = () => {
      navigate('/Admin/Users');
   }

   return (
      <>
          <MenuBar />
          <div className=" h-16"></div>
          <div className=" h-screen w-screen bg-slate-100 flex flex-col items-center">
          <div id="adminUsers" onClick={handleAdminUsers} className=" cursor-pointer h-20 bg-white rounded-3xl mt-5 p-3 pl-5 shadow-lg">
               <p className=" h-1/2 font-semibold flex items-center">Users</p>
               <div className=" h-1/2 font-light flex items-center " style={{fontSize: "12px"}}>Get all users and update users</div>
          </div>
          </div>
      </>
   );
}

export default AdminMain;