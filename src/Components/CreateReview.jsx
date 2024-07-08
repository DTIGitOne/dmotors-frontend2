import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import StarIcon from '../SVG/StarIcon';
import { Button, CircularProgress } from '@mui/material';
import { getIdToken } from '../functions/getTokenPayload';
import { createReviewCall } from '../API/API';

const CreateReview = ({ open, handleClose }) => {
   const [reviewInput, setReviewInput] = useState("");
   const [rating, setRating] = useState(0);
   const [loading, setLoading] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [userToken, setUserToken] = useState(true);
   const [createdReview, setCreateReview] = useState(false);

   const userId = getIdToken();

   const Token = localStorage.getItem('authorization');

   useEffect(() => {
      if (userId) {
        setUserToken(false);
      }
   }, []);

   const totalStars = 5;
   const filledColor = "#1070FF";
   const emptyColor = "#002D71";
 
   const handleRatingClick = (index) => {
     setRating(index + 1); 
   };
 
   const starColors = Array(totalStars).fill(emptyColor).map((color, index) => {
     return index < rating ? filledColor : emptyColor;
   });

   useEffect(() => {
      setErrorMsg("");
      setReviewInput("");
      setRating(0);
      setCreateReview(false);
   }, [handleClose]);
 
   const handleSubmit = async () => {
      if(!reviewInput) {
         return setErrorMsg("Review missing")
      } else if(rating <= 0) {
         return setErrorMsg("Rating missing")
      } else {
         setLoading(true);
         try {
            const response = await createReviewCall(userId, reviewInput, rating , Token)

            if(response.status === 201) {
               setCreateReview(true);
            } else if (response.data.message === "User already has a review") {
               setErrorMsg("Already have a review");
            }
         } catch(e) {
            console.log(e.response);
         } finally {
            setLoading(false);
         }
      }
      
   }

   return (
     <div>
       <Modal
         open={open}
         onClose={handleClose}
       >
       {createdReview ? (
         <div className=' rounded-3xl flex gap-1 flex-col items-center justify-center p-4 absolute top-1/2 left-1/2 w-4/5 bg-white' style={{transform: "translate(-50%, -50%)",height: "120px"}}>
            <p className=' text-2xl mb-2'>Review Created</p>
            <Button onClick={handleClose}>Go back</Button>
         </div>
       ) : (
         <div id='createReviewBox' className=' rounded-3xl flex gap-1 flex-col items-center justify-center p-4 absolute top-1/2 left-1/2 w-4/5 bg-white' style={{transform: "translate(-50%, -50%)",height: "480px"}}>
           {errorMsg ? (<h1 className=' text-2xl mb-3 text-red-500'>{errorMsg}</h1>) : (<h1 className=' text-2xl mb-3'>Create a review</h1>)}
           <p className=' w-full'>Review:</p>
           <textarea maxLength={100} className=' my-2 bg-slate-100 w-full' style={{height: "40%"}} value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} id="reviewInput"></textarea>
           <label className=' w-full text-end' htmlFor="reviewInput">{reviewInput.length}/100</label>
           <div className=' flex gap-3'>
           {starColors.map((color, index) => (
            <StarIcon
              key={index}
              style={{ cursor: 'pointer' }}
              color={color}
              onClick={() => handleRatingClick(index)}
            />
           ))}
           </div>
           <div className=' w-full mt-4 h-14 flex justify-center items-center'>
            {loading ? (
               <CircularProgress />
            ) : (
               <button disabled={userToken} onClick={handleSubmit} className='text-white w-full h-full rounded-2xl' style={{backgroundColor: "#1070FF"}}>{userToken ? ("Invalid user") : ("Submit")}</button>
            )}
           </div>
         </div>
       )}
       </Modal>
     </div>
   );
 }

export default CreateReview;