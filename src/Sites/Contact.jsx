import { useEffect, useRef } from "react";
import MenuBar from "../Components/MenuBar";
import { scrollToSection } from "../Constants/constants";
import DMotorsLogo from "../SVG/DMotorsLogo";
import { useNavigate } from "react-router-dom";

const Contact = () => {
   const mywebsite = process.env.REACT_APP_MYWEBSITE;

   const currentYear = new Date().getFullYear();

   const navigate = useNavigate();

   const contactRef = useRef();

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

   const redirectMain = () => {
      navigate(`/Main`);
   }

   const redirectAbout = () => {
      navigate(`/About`);
   }

   return(
      <div>
         <MenuBar />
         <div style={{height: "5vh"}}></div>
         <div className=" h-auto w-full flex flex-col bg-slate-100 flex flex-col" style={{height: "95vh"}}>
            <div ref={contactRef} className=" h-screen w-screen flex flex-col items-center gap-4 p-5">
               <h2 className=" text-center text-3xl mt-5" style={{color: "#s534D56"}}>Contact Info</h2>
               <div className=" bg-white rounded-2xl p-4" style={{width: "90%", letterSpacing: "0.5px"}}>
                  <p>
                     <span className=" font-semibold text-xl">T</span>his is a fake website, not meant for real use and all of the listings and information are meant to replicate a functioning website.
                  </p>
                  <p className=" mt-3">
                     You can use the website to create fake listings and check out the website's functions freely.
                  </p>
               </div>
               <div className=" mt-6 rounded-2xl flex flex-col gap-4 p-4 bg-white h-auto" style={{width: "90%"}}>
                  <div>
                     <p className=" font-semibold">Contact mail:</p>
                     <p className=" mt-2">dammirtaljanovic@gmail.com</p>
                  </div>
                  <div>
                     <p className=" font-semibold">For more information about me:</p>
                     <a href={mywebsite} target="_blank" rel="noopener noreferrer">
                        <button className=" mt-2" style={{color: "#1070FF"}}>My Website</button>
                     </a>
                  </div>
               </div>
            </div>
         </div>
         <div className=" w-full flex flex-col bg-slate-50" style={{ height: "auto" , color: "#534D56" , borderTop: "3px solid black"}}>
        <div className=" w-full flex flex-wrap" style={{ height: "250px"}}>
          <div className=" w-1/2 h-full flex flex-col  p-5">
            <span className=" font-semibold" style={{ fontSize: "17px"}}>DriveMotors</span>
            <div className="mt-4 flex flex-col gap-2 select-none">
              <div className=" cursor-pointer" onClick={() => scrollToSection(contactRef)}>Contact info</div>
            </div>
          </div>
          <div className=" w-1/2 h-full flex flex-col p-5">
             <span className=" font-semibold" style={{ fontSize: "17px"}}>Website</span>
            <div className="mt-4 flex flex-col gap-2 select-none">
             <div className=" cursor-pointer" onClick={redirectMain}>Main Page</div>
             <div className=" cursor-pointer" onClick={redirectAbout}>About us</div>  
             <div className=" cursor-pointer" onClick={() => scrollToSection(contactRef)}>Contact</div>
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
   );
}

export default Contact;
