import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { Modal, Box, useMediaQuery } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageIcon from '@mui/icons-material/Image';

const PreviewSlider = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const sliderRef = useRef(null);
    const modalSliderRef = useRef(null);

    const isLargeScreen = useMediaQuery('(min-width: 1024px)');

    const handleOpen = (index) => {
        setModalImageIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        pauseOnHover: true,
        pauseOnFocus: true,
        afterChange: current => setSelectedImageIndex(current),
    };

    const modalSettings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        initialSlide: modalImageIndex,
        afterChange: current => setModalImageIndex(current),
    };

    useEffect(() => {
        if (!open && sliderRef.current) {
            sliderRef.current.slickPlay();
        }
    }, [open]);

    return (
        <div id='pictureBoxBox' className='relative'>
            <div id='slidenumber' className='absolute z-50 right-0 top-6'>
                <div className='h-4 w-auto pl-2 p-5 rounded-l-lg justify-center items-center text-white flex' style={{ background: "rgba(0,0,0, 0.6)" }}>
                    <ImageIcon /><div className='ml-1'>{selectedImageIndex + 1} / {images.length}</div>
                </div>
            </div>
            <Slider {...settings} ref={sliderRef}>
                {images.map((image, index) => (
                    <div key={index} id='imageSliderId' style={{ outline: 'none' }}>
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
                        width: isLargeScreen ? '60%' : '100%',
                        boxShadow: 24,
                        p: 0,
                        overflow: 'hidden',
                    }}
                >
                    <Slider {...modalSettings} ref={modalSliderRef}>
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
                    <div className='absolute bottom-0 w-full flex justify-center items-center text-white p-2' style={{ background: "rgba(0,0,0, 0.6)" }}>
                        {modalImageIndex + 1} / {images.length}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default PreviewSlider;
