import { useNavigate, useParams } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { useState } from "react";
import { deleteUser } from "../API/API";
import LoaderIcon from "../SVG/LoaderIcon";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../Redux/Slices/User";

const DeleteUser = () => {
   const [ deleteModal , setDeleteModal] = useState(false);
   const [loading, setLoading] = useState(false);
   const { id } = useParams();

   const token = localStorage.getItem('authorization');
 
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleDeleteUser = async () => {
      setLoading(true)
      try {
         const response = await deleteUser(id, token);

         if (response.status === 200) {
            localStorage.removeItem('authorization');
            dispatch(setIsLogged(true))
            window.location.reload();
         }
      } catch (e) {
         console.log(e);
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <LoaderIcon />
        </div>
      ) : (
        <div className="h-screen w-screen bg-slate-100 flex flex-col items-center">
          <MenuBar />
          <div className="h-16 w-full"></div>
          <div className="w-full flex items-center mb-4 pl-2" style={{ height: "40px" }}>
            <button onClick={() => navigate('/settings')}>
              <ArrowBackIcon fontSize="large" />
            </button>
          </div>
          <div className="bg-white rounded-3xl flex flex-col p-3 justify-between" style={{ width: "92%", height: "130px" }}>
            <div className="flex flex-col justify-center w-full h-1/2">
              <p className="font-semibold">Delete user</p>
              <p style={{ fontSize: "12px" }}>By pressing this button this account will be lost</p>
            </div>
            <div className="w-full h-1/2 flex justify-center items-center">
              <Button variant="contained" color="error" onClick={() => setDeleteModal(true)}>Delete user</Button>
            </div>
          </div>
        </div>
      )}
    
      {deleteModal && (
        <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center" style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: "9999" }}>
          <div className="h-36 w-5/6 bg-white rounded-3xl flex flex-col justify-between p-4">
            <div className="h-1/2 w-full flex justify-center items-center">
              <p className="text-center">Are you sure you want to delete this user?</p>
            </div>
            <div className="w-full flex justify-between">
              <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
              <Button onClick={handleDeleteUser} size="medium" variant="contained" color="error">Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </>
   );
}

export default DeleteUser;