import LoaderIcon from "../SVG/LoaderIcon";
import DMotorsLogo from "../SVG/DMotorsLogo";
import MenuBar from "../Components/MenuBar"
import { useRef, useState , useEffect} from "react";
import { scrollToSection } from "../Constants/constants";
import CreateReview from "../Components/CreateReview";
import Messages from "../Components/Messages";
import { useNavigate } from "react-router-dom";

const About = () => {
   const AboutRef = useRef();
   const reviewRef = useRef();
   const currentYear = new Date().getFullYear();
   const [open, setOpen] = useState(false);
   const [userToken, setUserToken] = useState(false);

   const navigate = useNavigate();
   
   useEffect(() => {
    window.scrollTo(0, 0);
   }, []);

   const handleLoginNav = () => {
      navigate(`/Login`);
   }

   const userId = localStorage.getItem("authorization")

   useEffect(() => {
      if (userId) {
        setUserToken(true);
      }
   }, []);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
 
   return(
      <div>
         <div className=" h-12"></div>
         <MenuBar />
         <CreateReview open={open} handleClose={handleClose} />
         <div className=" h-auto bg-slate-100 w-full flex justify-center items-center flex-col" >
            <div ref={AboutRef} className=" w-full flex justify-center items-center flex-col" style={{height: "550px"}}>
               <h2 className=" text-4xl mb-6" style={{color: "534D56"}}>About us</h2>
               <div className=" p-6 w-4/5 bg-white rounded-3xl shadow-2xl">
                <p style={{fontSize: "17px", letterSpacing: "1px"}}><span className=" font-semibold text-2xl">L</span>orem ipsum, dolor sit amet consectetur adipisicing elit. Iusto eligendi maxime minima enim molestiae itaque error dolorum, perspiciatis laudantium dolorem possimus, reprehenderit facere amet voluptate? Adipisci sapiente sequi numquam inventore.Iusto eligendi maxime minima enim molestiae.</p>
               </div>
            </div>
            <div ref={reviewRef} className=" w-full mb-10 flex justify-center items-center flex-col" style={{height: "400px"}}>
               <h2 className=" text-center text-3xl">Had a positive experience?</h2>
               <div className=" mt-5 bg-white w-4/5 rounded-3xl h-24 flex justify-center items-center p-4 shadow-lg">
                {userToken ? (<button onClick={handleOpen} className=" w-full h-full rounded-2xl text-white font-light text-xl" style={{backgroundColor: "#1070FF"}}>Leave a review</button>) : (<button onClick={handleLoginNav} className=" w-full h-full rounded-2xl text-white font-light" style={{backgroundColor: "#1070FF"}}><span className=" font-medium">Log in</span> to leave a review</button>)}
               </div>
            </div>
            <div className=" w-full flex flex-col bg-slate-50" style={{ height: "auto" , color: "#534D56" , borderTop: "3px solid black"}}>
        <div className=" w-full flex flex-wrap" style={{ height: "250px"}}>
          <div className=" w-1/2 h-full flex flex-col  p-5">
            <span className=" font-semibold" style={{ fontSize: "17px"}}>DriveMotors</span>
            <div className="mt-4 flex flex-col gap-2 select-none">
              <div className=" cursor-pointer" onClick={() => scrollToSection(AboutRef)}>About</div>
              <div className=" cursor-pointer" onClick={() => scrollToSection(reviewRef)}>Create review</div>
            </div>
          </div>
          <div className=" w-1/2 h-full flex flex-col p-5">
             <span className=" font-semibold" style={{ fontSize: "17px"}}>Website</span>
            <div className="mt-4 flex flex-col gap-2 select-none">
             <div className=" cursor-pointer">Main Page</div>
             <div className=" cursor-pointer" onClick={() => scrollToSection(AboutRef)}>About us</div>  
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
      <Messages />
      </div>
   );
}

export default About;