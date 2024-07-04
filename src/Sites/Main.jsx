import MenuBar from "../Components/MenuBar";
import "../CustomCSS/main.css"
import SearchBox from "../Components/SearchBox";
import LoaderIcon from "../SVG/LoaderIcon";
import CardSlider from "../Components/CardSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Messages from "../Components/Messages";
import ReviewCard from "../Components/ReviewCard";
import ReviewsSlider from "../Components/ReviewsSlider";
import DMotorsLogo from "../SVG/DMotorsLogo";
import { useEffect, useRef } from "react";
import { scrollToSection } from "../Constants/constants";
import { getIdToken, getRoleToken } from "../functions/getTokenPayload";
import { findCars, getRecommended, getReviews } from "../API/API";
import { useDispatch, useSelector } from "react-redux";
import { clearCars, setCars } from "../Redux/Slices/carDataSlice";
import { setReviews } from "../Redux/Slices/Reviews";
import { setExpanded, setVisible } from "../Redux/Slices/MessageExpandedSlice";
import { setIsLogged } from "../Redux/Slices/User";
import { setPfp } from "../Redux/Slices/User";

const Main = () => {
   const idtoken = getIdToken();
   const currentYear = new Date().getFullYear();

   const searchRef = useRef(null);
   const recomendedRef = useRef(null);
   const messagesRef = useRef(null);
   const reviewsRef = useRef(null);
   const optionsRef = useRef(null);
   
   const dispatch = useDispatch();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

   useEffect(() => {
    return () => {
      dispatch(clearCars());
    };
   }, [dispatch]);

   const contentVisible = useSelector((state) => state.messageopen.contentVisible);

   const token = localStorage.getItem('authorization');
    
    useEffect(() => {
      const fetchAndSetCars = async () => {
        try {
          const cars = await getRecommended(token);
          const reviews = await getReviews();
          dispatch(setCars(cars));
          dispatch(setReviews(reviews.data));
        } catch (error) {
          console.error('Error in useEffect:', error);
        }
      };
  
      fetchAndSetCars();
    }, [dispatch]);


    const handleRandom = async () => {
      try {
        const response = await findCars({});

        console.log(response);
      } catch(e) {
        console.log(e);
      }
    }

    const openMessages = () => {
      dispatch(setExpanded(true));
      dispatch(setVisible(true));
    }

   return (
      <>
      <div className="w-full flex flex-col items-center bg-slate-100">
      <div className=" h-10"></div>
       <MenuBar />
       <div ref={searchRef} className=" w-full flex justify-center " style={{ height: '800px' , marginTop: '1%'}}>
         <div className="gradientBackgroundTop"></div>
         <div className=" z-10 h-full w-full flex justify-center items-center">
          <SearchBox />
         </div>
       </div>
       <div ref={recomendedRef} className=" w-full flex flex-col gap-6 justify-center items-center" style={{ height: "600px"}}>
         <p className=" text-center text-3xl font-medium" style={{ color: "#534D56" }}>
            Recomended Cars you 
            might like:
         </p>
         <CardSlider />
       </div>
       <div ref={messagesRef} className=" w-full flex justify-center items-center mt-20" style={{ height: "400px"}}>
         <div className="messageBox rounded-3xl w-4/5 bg-white" >
            <h1 className=" text-center p-5 text-3xl" style={{ color: "#1070FF"}}>Messages</h1>
            <p className=" text-xl p-2 text-center">You can use our messaging system to get in contact with the seller.</p>
            <div onClick={openMessages} className=" mt-2 w-full h-16 flex justify-center items-center text-white text-xl font-semibold" style={{ borderTop: "1px solid black" , backgroundColor: "#1070FF" , borderBottomLeftRadius: "24px" , borderBottomRightRadius: "24px"}}>Open messages</div>
         </div>
       </div>
       <div ref={reviewsRef} className=" w-full text-center flex flex-col gap-3 justify-center items-center" style={{ height: "500px" , color: "#534D56" , marginTop: "35px"}}>
         <p className=" text-3xl">Review's</p>
         <ReviewsSlider />
       </div>
       <div ref={optionsRef} className=" secondElementBackground w-full flex justify-end items-end" style={{ height: "400px" , color: "#534D56" , marginTop: "15px"}}>
         <div className=" secondElementBackgroundInner flex flex-col gap-3 justify-center items-center absolute">
         </div>
         <div className=" h-full w-full flex justify-center items-center z-50">
          <div className=" box-border p-2 h-4/5 w-4/5 gap-3 flex flex-col justify-center items-center bg-white rounded-3xl elementBoxShadow mb-5">
            <div className=" w-full flex flex-col justify-center items-center text-xl gap-8">
              <span className="text-center text-2xl font-medium">Dont Have a specific vehicle your looking for?</span>
              <span className="text-center">Look through all and choose the best option:</span>
            </div>
            <div className=" w-full flex justify-center items-center">
              <button onClick={handleRandom} className=" buttonBG p-4 rounded-2xl font-semibold">459,345 Vehicles avaible</button>
            </div>
          </div>
          </div>
       </div>
       <div className=" w-full flex flex-col bg-slate-100" style={{ height: "auto" , color: "#534D56" , borderTop: "3px solid black"}}>
        <div className=" w-full flex flex-wrap" style={{ height: "250px"}}>
          <div className=" w-1/2 h-full flex flex-col  p-5">
            <span className=" font-semibold" style={{ fontSize: "17px"}}>DriveMotors</span>
            <div className="mt-4 flex flex-col gap-2 select-none">
              <div className=" cursor-pointer" onClick={() => scrollToSection(searchRef)}>Search</div>
              <div className=" cursor-pointer" onClick={() => scrollToSection(recomendedRef)}>Recomended</div>
              <div className=" cursor-pointer" onClick={() => scrollToSection(messagesRef)}>Messages</div>
              <div className=" cursor-pointer" onClick={() => scrollToSection(reviewsRef)}>Reviews</div>
              <div className=" cursor-pointer" onClick={() => scrollToSection(optionsRef)}>Options</div>
            </div>
          </div>
          <div className=" w-1/2 h-full flex flex-col p-5">
             <span className=" font-semibold" style={{ fontSize: "17px"}}>Website</span>
            <div className="mt-4 flex flex-col gap-2 select-none">
             <div className=" cursor-pointer" onClick={() => scrollToSection(searchRef)}>Main Page</div>
             <div className=" cursor-pointer">About us</div>  
             <div className=" cursor-pointer">Contact</div>
            </div>
          </div>
        </div>
        <div className=" w-full p-5 flex flex-col gap-2">
          <p className=" font-semibold">Business contact:</p>
          <p>dammirtaljanovic@gmail.com</p>
        </div>
        <div className=" flex justify-end mt-10 font-semibold p-3">
          &copy; DriveMotors {currentYear}
        </div>
        <div className=" flex justify-start items-center flex-col gap-6" style={{ height: "70px" }}>
          <div className=" lightLine"></div>
          <DMotorsLogo />
        </div>
       </div> 
      </div>
      <Messages userId={idtoken} />
      </>
   );
}

export default Main;