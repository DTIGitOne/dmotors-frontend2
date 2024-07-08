import { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import LoaderIcon from "../SVG/LoaderIcon";
import { AdminUsersCall } from "../API/API";
import UsersCard from "../Components/UsersCard";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const AdminUsers = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   const fetchUsers = async (page = 1) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('authorization');
         const response = await AdminUsersCall(page, token);
         
         setUsers(response.data.users);
         setTotalPages(response.data.totalPages);
         setCurrentPage(response.data.currentPage);
      } catch (error) {
         console.error("Error fetching users:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchUsers(currentPage);
   }, [currentPage]);

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   return (
      <>
         <MenuBar />
         <div className="w-full" style={{height: "5vh"}}></div>
         <div className=" h-auto w-screen bg-slate-100 flex flex-col items-center" style={{minHeight: "95vh"}}>
            {loading ? (
               <div><LoaderIcon /></div>
            ) : (
               <div id="adminUsersBoxBox" className=" mt-10 w-full flex flex-col items-center gap-8">
                  {users.map(user => (
                     <UsersCard key={user._id} id={user._id} image={user.pfpURL} name={user.name} surname={user.surname} username={user.username} email={user.email} roles={user.role}/>
                  ))}
                  <div className="pagination mb-5">
                     <button style={{ backgroundColor: "#1070FF" }} className='p-1 text-white mr-3 rounded-xl' onClick={handlePreviousPage} disabled={currentPage === 1}><NavigateBeforeIcon /></button>
                     <span>
                        {Array.from({ length: totalPages }, (_, index) => (
                           <span
                              key={index + 1}
                              className=" font-semibold m-1 text-xl"
                              style={{ color: currentPage === index + 1 ? "#1070FF" : "#000000" }}
                           >
                              {index + 1}
                           </span>
                        ))}
                     </span>
                     <button  style={{ backgroundColor: "#1070FF" }} className='p-1 text-white ml-3 rounded-xl'  onClick={handleNextPage} disabled={currentPage === totalPages}><NavigateNextIcon /></button>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}

export default AdminUsers;
