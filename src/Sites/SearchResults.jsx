import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CardCar from '../Components/CardCar';
import { findCars } from '../API/API';
import CircularProgress from '@mui/material/CircularProgress';
import '../CustomCSS/Results.css';
import MenuBar from '../Components/MenuBar';
import CarTypeInput from '../Components/CarTypeInput';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { scrollToSection } from '../Constants/constants';
import DMotorsLogo from '../SVG/DMotorsLogo';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber, setResultLoading } from '../Redux/Slices/PageSlice';
import Messages from '../Components/Messages';
import LoaderIcon from '../SVG/LoaderIcon';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const [cars, setCars] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isMobileSearchVisible, setMobileSearchVisible] = useState(false);

    const page = useSelector((state) => state.pages.page);
    const resultLoading = useSelector((state) => state.pages.resultLoading );

    useEffect(() => {
        if (resultLoading) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
          } else {
            document.body.style.overflow = '';
          }
          return () => {
            document.body.style.overflow = '';
          };
    }, [resultLoading]);

    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const ResultsRef = useParams();

    const redirectMain = () => {
        navigate(`/Main`);
     }
  
     const redirectAbout = () => {
        navigate(`/About`);
     }
  
     const redirectContact = () => {
        navigate(`/Contact`);
     }

    const toggleMobileSearch = () => {
        setMobileSearchVisible(!isMobileSearchVisible);
    };

    const searchParams = new URLSearchParams(location.search);
    const searchCriteria = Object.fromEntries(searchParams.entries());

    useEffect(() => {
        const fetchCars = async () => {
            dispatch(setResultLoading(true));
            try {
                const { cars, total } = await findCars({ ...searchCriteria, page, limit: 10 });
                console.log('Cars fetched:', cars);
                console.log('Total count:', total);
                setCars(cars);
                setTotalPages(Math.ceil(total / 10)); // Assuming `total` is the total number of cars matching the search criteria
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setTimeout(() => {
                    dispatch(setResultLoading(false));
                }, 500);
            }
        };
    
        fetchCars();
    }, [location.search, page]);

    const handlePageChange = (newPage) => {
        dispatch(setPageNumber(newPage));
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const renderPaginationButtons = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(page - Math.floor(maxVisiblePages / 2), 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (startPage > 1) {
            pages.push(
                <button key={1} onClick={() => handlePageChange(1)} className="pagination-button">
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-button ${page === i ? 'active' : ''}`}
                    style={page === i ? { color: '#1070FF' } : {}}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis">...</span>);
            }
            pages.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="pagination-button">
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <>
        {resultLoading ? (<div className=" bg-white h-screen w-screen fixed top-0 left-0 flex justify-center items-center" style={{zIndex: "9999"}}><LoaderIcon /></div>) : (null)}
        <div className='bg-slate-100 w-full h-auto pt-10 flex flex-col items-center'>
            <MenuBar />
            <div style={{ height: "52px" }}></div>
            <span
                id='mobileButtonSearch'
                className="text-2xl font-medium py-3 text-white rounded-2xl flex justify-center items-center"
                style={{ backgroundColor: "#1070FF", width: "90%" }}
                onClick={toggleMobileSearch}
            >
                Change search
            </span>
            <div
                id='mobileSearch'
                className={`mobile-search ${isMobileSearchVisible ? 'open' : 'close'}`}
                style={{ width: "90%", color: "#534D56" }}
            >
                <CarTypeInput />
            </div>
            <div className=' hidden p-4 flex flex-col gap-5 items-center bg-white h-auto rounded-2xl' style={{width: "90%", color: "#534D56"}}>
                <span className="text-2xl font-medium">Change search</span>
                <CarTypeInput />
            </div>
            <div ref={ResultsRef} className='text-4xl mt-8 mb-4'>Results</div>
            <div className="search-results-container flex flex-col gap-3 w-full">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <CardCar
                            key={car._id}
                            brand={car.Brand}
                            model={car.Model}
                            image={car.CarImages[0]} // Assuming the first image is the main image
                            date={car.Year}
                            power={car.Performance}
                            gearbox={car.TransmitionType}
                            mileage={car.Mileage}
                            fuel={car.Fuel}
                            price={car.Price}
                            id={car._id}
                        />
                    ))
                ) : (
                    <div>No cars found.</div>
                )}
            </div>
            <div className="pagination mt-4 flex gap-2 text-xl">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className='p-2 text-white mr-3 rounded-2xl'
                    style={{ backgroundColor: "#1070FF" }}
                >
                    <NavigateBeforeIcon />
                </button>
                {renderPaginationButtons()}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || !totalPages}
                    className='p-2 text-white ml-3 rounded-2xl'
                    style={{ backgroundColor: "#1070FF" }}
                >
                    <NavigateNextIcon />
                </button>
            </div>
            <div className="w-full flex flex-col mt-10 bg-slate-50" style={{ height: "auto", color: "#534D56", borderTop: "3px solid black" }}>
               <div className="w-full flex flex-wrap" style={{ height: "250px" }}>
                  <div className="w-1/2 h-full flex flex-col p-5">
                     <span className="font-semibold" style={{ fontSize: "17px" }}>DriveMotors</span>
                     <div className="mt-4 flex flex-col gap-2 select-none">
                        <div className="cursor-pointer" onClick={() => scrollToSection(ResultsRef)}>Results</div>
                     </div>
                  </div>
                  <div className="w-1/2 h-full flex flex-col p-5">
                     <span className="font-semibold" style={{ fontSize: "17px" }}>Website</span>
                     <div className="mt-4 flex flex-col gap-2 select-none">
                        <div className="cursor-pointer" onClick={redirectMain}>Main Page</div>
                        <div className="cursor-pointer" onClick={redirectAbout}>About us</div>
                        <div className="cursor-pointer" onClick={redirectContact}>Contact</div>
                     </div>
                  </div>
               </div>
               <div className="w-full p-5 flex flex-col gap-2">
                  <p className="font-semibold">Business contact:</p>
                  <p>dammirtaljanovic@gmail.com</p>
               </div>
               <div className="flex justify-end mt-10 font-semibold p-3">
                  &copy; DriveMotors {currentYear}
               </div>
               <div className="flex justify-start items-center flex-col gap-6" style={{ height: "70px" }}>
                  <div className="lightLine"></div>
                  <DMotorsLogo />
               </div>
            </div>
            <Messages />
        </div>
        </>
    );
};

export default SearchResults;
