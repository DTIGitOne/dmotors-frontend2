import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { emailRegex } from "../Regex/Regex";
import { forgotpassword } from "../API/API";

const ForgotPassword = () => {
   const [ email, setEmail] = useState("");
   const [emailError, setEmailError] = useState(false);
   const [emailSent, setEmailSent] = useState(false);

   const emailChange = (e) => {
      setEmail(e.target.value);
      setEmailError(false);
     }

     const forgotpasswordCall = async () => {
       try {
         const response = await forgotpassword(email);

         if (response.status === 200) {
            setEmailSent(true);
         } else {
            setEmailError(response.data.message);
         }
       } catch(e) {

       }
     }

   const handleSend = () => {
      if (!email) {
         setEmailError("mail is missing");
      }

      if(email) {
         if(!emailRegex.test(email)) {
            setEmailError("Incorrect email format")
         } else {
            forgotpasswordCall();
         }
      }
   }

   return(
      <div className=" h-screen w-screen bg-slate-100 flex justify-center items-center flex-col">
         <div className=" flex flex-col justify-center items-center gap-5 h-64 w-4/5 bg-white rounded-3xl shadow-lg">
          <p className=" text-center">Select the gmail you want the reset link to be sent to</p>
          <div className=' h-12 w-4/5'>
           <TextField className=' w-full' value={email} onChange={(e) => emailChange(e)} error={emailError ? true : false} helperText={emailError} id="gmail" type="email" placeholder='example@gmail.com' variant="standard" />
          </div>
           <Button size="large" variant="contained" onClick={handleSend}>
              <p style={{ fontFamily: 'Poppins' }}>Reset Password</p>
            </Button>
         </div>
         {emailSent ? (
            <div className=" text-center mt-5">
            Password reset link sent to:
            <p className=" text-blue-400">{email}</p>
         </div>
         ) : (
            null
         )}
      </div>
   );
}

export default ForgotPassword;