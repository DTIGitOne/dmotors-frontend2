import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../CustomCSS/Signup.css';
import MenuBar from '../Components/MenuBar';
import LoaderIcon from '../SVG/LoaderIcon';
import { emailRegex } from '../Regex/Regex';
import { signupUser } from '../API/API';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const navigate = useNavigate();

  const [name , setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);

  const nameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  }

  const surnameChange = (e) => {
   setSurname(e.target.value);
   setSurnameError(false);
  }

  const usernameChange = (e) => {
   setUsername(e.target.value);
   setUsernameError(false);
  }

  const emailChange = (e) => {
   setEmail(e.target.value);
   setEmailError(false);
  }

  const passwordChange = (e) => {
   setPassword(e.target.value);
   setPasswordError(false);
  }

  const repeatPasswordChange = (e) => {
   setRepeatPassword(e.target.value);
   setRepeatPasswordError(false);
  }

  const handleSend = async () => {
    if (!name) {
       setNameError("Name is missing");
    } 
    if (!surname) {
      setSurnameError("Surname is missing");
    }
    if (!username) {
      setUsernameError("Username is missing");
    }
    if (!email) {
      setEmailError("Email is missing");
    }
    if(!password) {
      setPasswordError("Password is missing");
    } 
    if(!repeatPassword) {
      setRepeatPasswordError("(Password) repeat is missing")
    }

    if (email && name && surname && username && password && repeatPassword) {
      if (!emailRegex.test(email)) {
         setEmailError("Invalid format");
      } else {
         if (password !== repeatPassword) {
            setRepeatPasswordError("Password dosent match");
          } else {
            try {
               setLoading(true);
               const response = await signupUser(name, surname, username, email, password)
               if (response.data.nameMessage) {
                  setNameError(response.data.nameMessage);
               }
               if (response.data.surnameMessage) {
                  setSurnameError(response.data.surnameMessage)
               }
               if (response.data.usernameMessage) {
                  setUsernameError(response.data.usernameMessage)
               }
               if (response.data.emailMessage) {
                  setEmailError(response.data.emailMessage)
               }
               if(response.data.passwordMessage) {
                  setPasswordError(response.data.passwordMessage)
               }
               if(response.data.message === "username or email already exist") {
                  setEmailError(response.data.message)
               }
               if(response.status === 201) {
                  const userId = response.data.id

                  navigate(`/VerifyGmail/${userId}`)
               }
            } catch(e) {
               setEmailError(e.response);
               console.log(e);
            } finally {
               setLoading(false);
            }
          }
      }
    }
    
    
  }

  return (
    <>
      {loading ? (
        <div className='h-screen w-screen flex justify-center items-center bg-slate-100'><LoaderIcon /></div>
      ) : (
        <div className="h-screen w-screen bg-slate-100 flex justify-center items-center flex-col gap-2">
          <div className="h-10"></div>
          <MenuBar />
          <p className="text-4xl font-medium" style={{ color: '#1070FF' }}>Sign up</p>
          <div className="rounded-3xl border bg-white flex justify-start flex-col p-4 gap-5 m-2 mb-1" style={{height: "590px", width: "88%"}}>
            <p className="text-center text-xl">Create your account</p>
            <div className=' flex flex-col w-full gap-2'>
              <div className=' h-16 w-full'>
                <TextField className=' w-full' value={name} onChange={(e) => nameChange(e)} error={nameError ? true : false} helperText={nameError} id="name" label="Name" variant="standard" />
              </div>
              <div className=' h-16 w-full'>
                <TextField className=' w-full' value={surname} onChange={(e) => surnameChange(e)} error={surnameError ? true : false} helperText={surnameError} id="surname" label="Surname" variant="standard" />
              </div>
              <div className=' h-16 w-full'>
                <TextField className=' w-full' value={username} onChange={(e) => usernameChange(e)} error={usernameError ? true : false} helperText={usernameError} id="username" label="Username" variant="standard" />
              </div>
            </div>
            <div className=' divLine'></div>
            <div className=' h-12 w-full'>
              <TextField className=' w-full' value={email} onChange={(e) => emailChange(e)} error={emailError ? true : false} helperText={emailError} id="gmail" type="email" placeholder='example@gmail.com' variant="standard" />
            </div>
            <div className=' h-12 w-full'>
            <TextField
              className=' w-full'
              value={password} 
              onChange={(e) => passwordChange(e)}
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
            <div className=' h-12 w-full'>
            <TextField
              className=' w-full'
              error={repeatPasswordError ? true : false}
              helperText={repeatPasswordError}
              value={repeatPassword} 
              onChange={(e) => repeatPasswordChange(e)}
              id="repeat-password"
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat Password"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle repeat password visibility"
                      onClick={handleClickShowRepeatPassword}
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            </div>
            <Button size="large" variant="contained" onClick={handleSend}>
              <p style={{ fontFamily: 'Poppins' }}>Sign up</p>
            </Button>
          </div>
          <div>
          <p>Already have an account?</p>
          <p onClick={() => navigate('/Login')} className=' text-center cursor-pointer' style={{ color: '#1070FF' }}>Log in</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
