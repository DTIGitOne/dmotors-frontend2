import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import LoaderIcon from '../SVG/LoaderIcon';
import { useParams } from 'react-router-dom';
import { resendCode } from '../API/API';
import { verifyGmail } from '../API/API';
import { useNavigate } from 'react-router-dom';
import '../CustomCSS/index.css';

const VerifyGmail = () => {
  const [loading, setLoading] = useState(false);
  const [code , setCode] = useState("");
  const [codeError , setCodeError] = useState(false);
  const [error, setError] = useState("");
  const [ verified , setVerified] = useState("");
  const [codeMessage, setCodeMessage] = useState("A code has been sent to your email");
  const [disableResend, setDisableResend] = useState(false); 
  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleResend = async () => {
    try {
      setDisableResend(true); 
      const response = await resendCode(userId);

      if (response.status === 200) {
         setCodeMessage(response.data.message);
      }
      if(response.status === 400) {
         if(response.data.messageNumber) {
            setCodeMessage(response.data.messageNumber)
         } else {
            setError(response.data.message);
         }
      }
    } catch (error) {
      console.error('Error resending code:', error);
    } finally {
      setTimeout(() => {
        setDisableResend(false);
      }, 15000); 
    }
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const response = await verifyGmail(userId , code);

      if (response.status === 200) {
         setLoading(false);
         setVerified(response.data.message)
         const token = response.data.token;
         localStorage.setItem("authorization", token);

         setTimeout(() => {
           navigate('/Main')
         }, 1000);
      } else if (response.status === 400 && response.data.codeMessage){
         setCodeError(response.data.codeMessage);
      }

    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleCode = (e) => {
    setCode(e.target.value);
    setCodeError(false);
  }

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

  return (
   <>
   {loading ? (
     <div className='h-screen w-screen flex justify-center items-center bg-slate-100'><LoaderIcon /></div>
   ) : (
     verified ? (
       <div className=' h-screen w-screen flex justify-center items-center'>User verified</div>
     ) : (
       <div className="h-screen w-screen bg-slate-100 flex justify-center items-center flex-col gap-2">
         <p className='text-3xl'>Verification</p>
         <div id='verifyGmailBox' className='bg-white h-60 w-3/4 rounded-3xl gap-3 flex flex-col p-3'>
           <p className='text-center'>{codeMessage}</p>
           <TextField
             value={code}
             onChange={(e) => handleCode(e)}
             helperText={codeError}
             error={codeError ? true : false}
             type='number'
             id="code"
             placeholder="Code"
             variant="standard"
           />
           <Button onClick={handleResend} disabled={disableResend} type='text'>Resend code</Button>
           <Button onClick={handleSendCode} variant='contained'>Send</Button>
         </div>
       </div>
     )
   )}
 </>
  );
};

export default VerifyGmail;
