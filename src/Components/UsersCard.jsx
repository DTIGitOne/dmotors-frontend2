import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { changeUserAdmin } from '../API/API';

const UsersCard = ({name, surname, username, email, image, roles, id}) => {
   const [intialRole, setIntialRole] = useState(roles);
   const [role, setRole] = useState(roles);
   const [initialUsername, setInitialUsername] = useState(username);
   const [usernameInput, setUsernameInput] = useState(username);
   const [newData, setNewData] = useState(false);
   const [userAdmin, setUserAdmin] = useState(false);

   useEffect(() => {
    if (roles === "ADMIN") {
      setUserAdmin(true);
    }
   }, []);

   useEffect(() => {
      if (role !== intialRole || usernameInput !== initialUsername) {
        setNewData(true);
      } else {
        setNewData(false);
      }
   }, [role]);

   useEffect(() => {
      if (usernameInput !== initialUsername || role !== intialRole) {
        setNewData(true);
      } else {
        setNewData(false);
      }
   },[usernameInput]);

   const token = localStorage.getItem('authorization');

   const navigate = useNavigate();

   const handleChange = (event) => {
      setRole(event.target.value);
    };

    const handleUser = () => {
      navigate(`/users/${id}`);
    }

    const handleClose = () => {
      setUsernameInput(initialUsername);
      setRole(intialRole);
      setNewData(false);
    }

    const handleSubmit = async () => {
      try {
        const response = await changeUserAdmin(id, role, usernameInput, token)

        if (response.message === "User updated successfully") {
           setNewData(false);
        }
      } catch(e) {
        console.log(e);
      }
    }

   return (
      <div className=" bg-white p-3 rounded-2xl h-auto flex flex-col" style={{width: "90%", border: userAdmin ? "2px solid #1070FF" : "none"}}>
         <div className=' w-full h-full flex'>
         <div className=" w-1/3 flex flex-col items-center justify-center">
          <div className=" rounded-full h-24 w-24 object-cover overflow-hidden bg-black mb-2">
            <img onClick={handleUser} src={image} className=' object-cover w-full h-full' alt="" />
          </div>
           <FormControl sx={{ m: 1, minWidth: 96 }} size="small">
            <InputLabel id="demo-select-small-label">Role</InputLabel>
             <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={role}
              label="Role"
              onChange={handleChange}
              disabled={intialRole === "ADMIN"}
             >
              <MenuItem value={"CLIENT"}>Client</MenuItem>
              <MenuItem value={"ADMIN"}>Admin</MenuItem>
            </Select>
          </FormControl>
         </div>
         <div className=" w-2/3 p-1" style={{fontSize: "13px"}}>
          <div className=' overflow-x-auto bg-slate-300 w-full h-1/4 p-2'><span className=' font-semibold'>name:</span> {name}</div>
          <div className=' overflow-x-auto w-full h-1/4 p-2'><span className=' font-semibold'>surname:</span> {surname}</div>
          <div className=' overflow-x-auto bg-slate-300 w-full h-1/4 p-2 flex items-center'><span className=' font-semibold'>username:</span> <input id='usernameEdit' disabled={intialRole === "ADMIN"} maxLength={18} className=' w-full ml-1 bg-transparent' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} /></div>
          <div className=' overflow-x-auto w-full h-1/4 p-2 flex'><span className=' font-semibold'>email:</span><span className=' ml-1'>{email}</span></div>
         </div>
         </div>
         {newData ? (
          <div className=' w-full flex justify-between h-auto pt-1'>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
         </div>
         ) : (
          null
         )}
      </div>
   );
}

export default UsersCard;