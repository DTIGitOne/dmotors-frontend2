import React, { useState } from 'react';
import Slider from 'react-slick';
import { Modal, Box, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ImageIcon from '@mui/icons-material/Image';

const PreviewSlider = ({ images }) => {
   const [open, setOpen] = useState(false);
   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

   const handleOpen = (index) => {
      setSelectedImageIndex(index);
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      setSelectedImageIndex(0);
   };

   const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: false,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
   };

   const modalSettings = {
      ...settings,
      initialSlide: selectedImageIndex,
      afterChange: current => setSelectedImageIndex(current),
   };

   return (
      <div className='relative'>
         <div className='absolute z-50 right-0 top-6'>
          <div className='h-4 w-auto pl-2 p-5 rounded-l-lg justify-center items-center text-white flex' style={{background: "rgba(0,0,0, 0.6)"}}>
           <ImageIcon /><div className='ml-1'>{images.length}</div>
          </div>
         </div>
         <Slider {...settings}>
            {images.map((image, index) => (
               <div key={index} style={{ outline: 'none' }}>
                  <img
                     src={image}
                     alt={`Slide ${index}`}
                     style={{ width: "100%", cursor: "pointer", outline: "none" }}
                     onClick={() => handleOpen(index)}
                     onMouseDown={(e) => e.preventDefault()}
                  />
               </div>
            ))}
         </Slider>

         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="image-modal-title"
            aria-describedby="image-modal-description"
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  boxShadow: 24,
                  p: 0,
                  overflow: 'hidden',
               }}
            >
               <Slider {...modalSettings}>
                  {images.map((image, index) => (
                     <div key={index} style={{ outline: 'none' }}>
                        <img 
                          src={image} 
                          alt={`Full Preview ${index}`} 
                          style={{ width: "100%", outline: "none" }}
                          onMouseDown={(e) => e.preventDefault()}
                        />
                     </div>
                  ))}
               </Slider>
               <div className=' bg-transparent flex justify-center items-center text-white'>1</div>
            </Box>
         </Modal>
      </div>
   );
};

export default PreviewSlider;
