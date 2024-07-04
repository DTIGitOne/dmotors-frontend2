import { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import axios from 'axios';
import LoaderIcon from "../SVG/LoaderIcon";

const AdminUsers = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   const fetchUsers = async (page = 1) => {
      setLoading(true);
      try {
         const token = localStorage.getItem('authorization');
         const response = await AdminUsers(page, token);
         
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
         <div className="h-16"></div>
         <div className="h-screen w-screen bg-slate-100 flex flex-col items-center">
            {loading ? (
               <div><LoaderIcon /></div>
            ) : (
               <div>
                  <ul>
                     {users.map(user => (
                        <li key={user._id}>{user.username}</li>
                     ))}
                  </ul>
                  <div className="pagination">
                     <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                     <span>Page {currentPage} of {totalPages}</span>
                     <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}

export default AdminUsers;
