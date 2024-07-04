import TextField from '@mui/material/TextField';
import MenuBar from "../Components/MenuBar";
import { getUser, updateUser } from '../API/API';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import LoaderIcon from '../SVG/LoaderIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserInformation = () => {
   const { id } = useParams();
   const [name, setName] = useState("a");
   const [initialUsername, setInitialUsername] = useState("");
   const [surname, setSurname] = useState("a");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("a");
   const [password, setPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [disabledPassword, setDisabledPassword] = useState(true);
   const [newData, setNewData] = useState(false);
   const [updatedUser, setUpdatedUser] = useState("");
   const [loading, setLoading] = useState(false);

   const token = localStorage.getItem('authorization');

   const [usernameError, setUsernameError] = useState(false);
   const [passwordError, setPasswordError] = useState(false);
   const [newPasswordError, setNewPasswordError] = useState(false);

   const handleUsername = (e) => {
      const value = e.target.value;
      setUsername(value);
      setUsernameError(false);
      setUpdatedUser("");
      setNewData(value !== initialUsername);
   };

   const handlePassword = (e) => {
      const value = e.target.value;
      setPassword(value);
      setPasswordError(false);
      setUpdatedUser("");
      setNewData(value !== "");
   };

   const handleNewPassword = (e) => {
      const value = e.target.value;
      setNewPassword(value);
      setNewPasswordError(false);
      setUpdatedUser("");
      setNewData(value !== "");
   };

   useEffect(() => {
      setDisabledPassword(password.length < 8);
   }, [password]);

   useEffect(() => {
      getUserFunc();
   }, []);

   const navigate = useNavigate();

   const getUserFunc = async () => {
      try {
         const response = await getUser(id);
         setName(response.data.name);
         setSurname(response.data.surname);
         setUsername(response.data.username);
         setInitialUsername(response.data.username);
         setEmail(response.data.email);
      } catch (e) {
         console.log(e);
      }
   };

   const submit = async () => {
      if (!username) {
         setUsernameError("Username is missing");
         return;
      }
      if (username.length > 18 || username.length < 2) {
         setUsernameError("Username must be between 2 and 18 characters");
         return;
      }
      if (!password) {
         setPasswordError("Password is missing");
         return;
      }
      if (newPassword && newPassword.length < 8) {
         setNewPasswordError("New password must be at least 8 characters");
         return;
      }

      const updates = {};
      if (username !== initialUsername) {
         updates.username = username;
      }
      if (newPassword) {
         updates.newPassword = newPassword;
      }

      setLoading(true);
      try {
         const response = await updateUser(id, updates.username, updates.newPassword, password, token);
         setNewData(false);
         
         if (response.status === 200) {
            setUpdatedUser(response.data.message);
         }
         if (response.status === 400) {
            if (response.data.usernameMessage) {
               setUsernameError(response.data.usernameMessage);
            } else if (response.data.passwordMessage) {
               setNewPasswordError(response.data.passwordMessage);
            } else if (response.data.message === "Incorrect user details") {
               setPasswordError(response.data.message);
            } else if (response.data.message === "Username already exists") {
               setUsernameError(response.data.message);
            }
         }
      } catch (error) {
         setLoading(false);
         console.error('Error:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="h-screen w-screen bg-slate-100 flex flex-col">
         <MenuBar />
         <div className="h-16 w-full"></div>
         <div className=' w-full flex items-center mb-4 pl-2' style={{height: "40px"}}><button onClick={() => navigate('/settings')}><ArrowBackIcon fontSize='large'/></button></div>
         <div className="h-auto w-full flex flex-col justify-center items-center">
            <div className="bg-white rounded-3xl p-3 pt-9 shadow-lg" style={{ width: "95%", height: "700px" }}>
               <div className="w-full" style={{height: "83px"}}>
                  <TextField className="w-full" helperText="Cannot change" disabled={true} label="Name" value={name} variant="filled" />
               </div>
               <div className=" w-full" style={{height: "83px"}}>
                  <TextField className="w-full" helperText="Cannot change" disabled={true} label="Surname" value={surname} variant="filled" />
               </div>
               <div className=" w-full" style={{height: "83px"}}>
                  <TextField className="w-full" onChange={handleUsername} helperText={usernameError} error={Boolean(usernameError)} label="Username" value={username} variant="filled" />
               </div>
               <div className=" w-full" style={{height: "83px"}}>
                  <TextField className="w-full" helperText="Cannot change" disabled={true} label="Email" value={email} variant="filled" />
               </div>
               <div className=" w-full" style={{height: "83px"}}>
                  <TextField className="w-full" type='password' onChange={handlePassword} helperText={passwordError} error={Boolean(passwordError)} label="Password (Required) " value={password} variant="filled" />
               </div>
               <div className=" w-full" style={{height: "83px"}}>
                  <TextField className="w-full" type='password' disabled={disabledPassword} onChange={handleNewPassword} helperText={newPasswordError} error={Boolean(newPasswordError)} label="New password" value={newPassword} variant="filled" />
               </div>
               <div className=" w-full flex justify-center items-center" style={{height: "83px"}}>
                {loading ? (
                  <div className=' w-14 h-14 flex justify-center items-center'><LoaderIcon /></div>
                ) : (
                  newData && <Button size="large" variant="contained" onClick={submit}>Confirm changes</Button>
                )}
               </div>
               <div className=' w-full text-center'>
                {updatedUser}
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserInformation;
