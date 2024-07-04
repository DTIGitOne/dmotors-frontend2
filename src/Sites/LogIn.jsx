import { useState } from "react";
import MenuBar from "../Components/MenuBar";
import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { emailRegex } from "../Regex/Regex";
import { loginUser } from "../API/API";
import LoaderIcon from "../SVG/LoaderIcon";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [loading , setLoading] = useState(false);

   const [username , setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [usernameError , setUsernameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const [errorMessage, setErrorMessage] = useState("");

   const navigate = useNavigate();

   const handleClickShowPassword = () => setShowPassword(!showPassword);

   const handleName = (e) => {
      setUsername(e.target.value);
      setUsernameError(false);
   }

   const handleEmail = (e) => {
      setEmail(e.target.value);
      setEmailError(false);
   }

   const handlePassword = (e) => {
      setPassword(e.target.value);
      setPasswordError(false);
   }

   const handleSend = async () => {
      if (!username) {
         setUsernameError("Username is missing");
      }
      if (!email) {
         setEmailError("Email is missing");
      }
      if (!password) {
         setPasswordError("Password is missing");
      }

      if (email && username && password) {
         if(!emailRegex.test(email)) {
            setEmailError("incorrect gmail format");
         } else {
            try {
               setLoading(true);
               const response = await loginUser(username , email , password);
               
               if (response.status === 200) {
                  const token = response.data.token;
                  navigate('/Main');

                  localStorage.setItem('authorization', token);
               } else if (response.status === 404 && response.data.Message) {
                  setErrorMessage(response.data.Message);
               } else if (response.status === 400 && response.data.message) {
                  setErrorMessage(response.data.message)
               } else if (response.status === 403 && response.data.message) {
                  navigate(`/VerifyGmail/${response.data.id}`);
               }
            } catch(e) {
               console.log(e);
            } finally {
               setLoading(false);
            }
         }
      }
   }

   return (
      <>
    {loading ? (
      <div className=" bg-slate-100 flex justify-center items-center h-screen w-screen"><LoaderIcon /></div>
    ) : (
      <div className="bg-slate-100 w-screen h-screen flex justify-center items-center flex-col gap-3">
        <div className="h-10"></div>
        <MenuBar />
        <div className="text-4xl font-medium" style={{ color: '#1070FF' }}>Log in</div>
        <div className="bg-white rounded-3xl w-4/5 flex flex-col items-center p-5 pt-10" style={{ height: "350px" }}>
          <div className='h-16 w-full'>
            <TextField 
              value={username} 
              helperText={usernameError} 
              onChange={(e) => handleName(e)} 
              error={usernameError ? true : false} 
              className='w-full' 
              placeholder="Username" 
              id="name" 
              variant="standard" 
            />
          </div>
          <div className='h-16 w-full'>
            <TextField 
              value={email} 
              helperText={emailError} 
              onChange={(e) => handleEmail(e)} 
              error={emailError ? true : false} 
              className='w-full' 
              placeholder="Email" 
              id="name" 
              variant="standard" 
            />
          </div>
          <div className='h-16 w-full'>
            <TextField
              className='w-full'
              value={password} 
              onChange={(e) => handlePassword(e)}
              error={passwordError ? true : false} 
              helperText={passwordError}
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button className=" h-16 w-full" onClick={() => navigate('/forgotpassword')}>Forgot Password?</button>
          <Button className=" mt-2" onClick={handleSend} size="large" variant="contained">
            <p style={{ fontFamily: 'Poppins' }}>Log in</p>
          </Button>
          <div className=" h-7 mt-1 text-red-600">
            {errorMessage}
          </div>
        </div>
        <div>
          <p>Dont have an account?</p>
          <p onClick={() => navigate('/Signup')} className="text-center" style={{ color: '#1070FF' }}>Sign up</p>
        </div>
      </div>
    )}
  </>
   );
}

export default LogIn;