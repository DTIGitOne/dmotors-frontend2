import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCar } from '../API/API';
import { CircularProgress } from '@mui/material';
import { getIdToken } from '../functions/getTokenPayload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

  const DeleteCar = ({CarId}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const [carDeleted, setCarDeleted] = React.useState("");
  const token = localStorage.getItem('authorization');
  const idToken = getIdToken();

  const navigate = useNavigate();

  const handleDelete = async () => {
     setLoading(true)
     try {
       const response = await deleteCar(CarId, token);

       if(response.status === 200) {
         setCarDeleted("Listing deleted")

         setTimeout(() => {
            navigate(`/users/${idToken}`);
         }, 1500);
       }
     } catch(e) {
       console.log(e);
     } finally {
       setLoading(false);
     }
  }

  return (
    <div>
      <div onClick={handleOpen} className=" h-16 w-full bg-red-600 hover:bg-red-700 text-white flex justify-center items-center">Delete listing <DeleteIcon /></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {carDeleted ? (
         <div className='w-full h-full flex justify-center items-center'>Listing Deleted</div>
        ) : (
          loading ? (
              <div className='w-full h-full flex justify-center items-center'><CircularProgress /></div>
          ) : (
            <div>
             <div className='text-center text-xl'>Are you sure you want to delete this listing?</div>
              <div className='flex w-full justify-end gap-2 mt-3'>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleDelete} color='error'>Delete</Button>
              </div>
             </div>
          )
        )}
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteCar;