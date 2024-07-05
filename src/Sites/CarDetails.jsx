import { useEffect, useRef, useState } from "react";
import MenuBar from "../Components/MenuBar";
import PreviewSlider from "../Components/PreviewSlider";
import DMotorsLogo from "../SVG/DMotorsLogo";
import { useNavigate, useParams } from "react-router-dom";
import { getCar, getUser } from "../API/API";
import '../CustomCSS/CarDetails.css';
import { useDispatch } from "react-redux";
import { setExpanded, setOpenMessages, setVisible } from "../Redux/Slices/MessageExpandedSlice";
import Messages from "../Components/Messages";
import { getIdToken } from "../functions/getTokenPayload";
import CarMainDetails from "../Components/CarMainDetails";
import CarSecondDetails from "../Components/CarSecondDetails";
import DeleteCar from "../Components/DeleteCar";
import LoaderIcon from "../SVG/LoaderIcon";
import { scrollToSection } from "../Constants/constants";

const CarDetails = () => {
   const { carId } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);
   const [images, setImages] = useState([]);
   const [brand, setBrand] = useState("");
   const [model, setModel] = useState("");
   const [userId, setUserId] = useState("");
   const [userTittle, setUserTittle] = useState("");
   const [userImage, setUserImage] = useState("");
   const [username, setUsername] = useState("");
   const [usersCar, setUsersCar] = useState(false);
   const [year, setYear] = useState("");
   const [power, setPower] = useState("");
   const [gearbox, setGearbox] = useState("");
   const [mileage, setMileage] = useState("");
   const [fuel, setFuel] = useState("");
   const [condition, setCondition] = useState("");
   const [category, setCategory] = useState("")
   const [performance, setPerformance] = useState("");
   const [driveTrain, setDriveTrain] = useState("");
   const [driveType, setDriveType] = useState("");
   const [VIN, setVIN] = useState("");
   const [transmitionType, setTransmitionType] = useState("");
   const [firstRegistration, setFirstRegistration] = useState("");
   const [registration, setRegistration] = useState("");
   const [SeatNumber, setSeatNumber] = useState("");
   const [DoorNumber, setDoorNumber] = useState("");
   const [pollutantClass, setPollutantClass] = useState("");
   const [owners, setOwners] = useState("");
   const [color, setColor] = useState("");
   const [colorManufacturer, setColorManufacturer] = useState("");
   const [interior, setInterior] = useState("");
   const [carOptions, setCarOptions] = useState([]);
   const [carBio, setCarBio] = useState("");

   const ImagePreviewRef = useRef();
   const ProfileSectionRef = useRef();
   const VehicleDetailsRef = useRef();
   const AditionalOptionsRef = useRef();
   const AditionalInfoRef = useRef();

   const redirectMain = () => {
      navigate(`/Main`);
   }

   const redirectAbout = () => {
      navigate(`/About`);
   }

   const redirectContact = () => {
      navigate(`/Contact`);
   }

   const token = localStorage.getItem('authorization');
   const currentYear = new Date().getFullYear();
   const tokenId = getIdToken();

   const handleCreateChat = async () => {
      try {
         dispatch(setExpanded(true));
         dispatch(setVisible(true));
         dispatch(setOpenMessages(true));
      } catch (e) {
         console.log(e.response);
      }
   };

   useEffect(() => {
      if (loading) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [loading]);

   useEffect(() => {
      window.scrollTo(0, 0);
     }, []);

   const getCarFunc = async () => {
      setLoading(true);
      try {
         const response = await getCar(carId, token);

         if (response.status === 200) {
            const car = response.data.car[0]; // Assuming car data is the first object in the array
            try {
               const userResponse = await getUser(car.Seller);

               if (userResponse.status === 200) {
                  if (car.Seller === tokenId) {
                     setUsersCar(true);
                  } else {
                     setUsersCar(false);
                  }
                  setUserImage(userResponse.data.pfp);
                  setUsername(userResponse.data.username);

                  setUserId(car.Seller);
                  setImages(car.CarImages);
                  setBrand(car.Brand);
                  setModel(car.Model);
                  setUserTittle(car.userTittle);
                  setYear(car.Year);
                  setPower(car.Performance);
                  setGearbox(car.TransmitionType);
                  setMileage(car.Mileage);
                  setFuel(car.Fuel);
                  setCondition(car.VehicleCondition);
                  setCategory(car.Category);
                  setPerformance(car.Performance);
                  setDriveTrain(car.Drivetrain);
                  setDriveType(car.DriveType);
                  setFuel(car.Fuel);
                  setVIN(car.VIN);
                  setTransmitionType(car.TransmitionType);
                  setFirstRegistration(car.FirstRegistration);
                  setRegistration(car.Registration);
                  setSeatNumber(car.SeatNumber);
                  setDoorNumber(car.DoorNumber);
                  setPollutantClass(car.PollutantClass);
                  setOwners(car.Owners);
                  setColorManufacturer(car.ColorManufacturer);
                  setColor(car.Color);
                  setInterior(car.Interior);
                  setCarOptions(car.CarOptions);
                  setCarBio(car.AditionalBio);
               }
            } catch (e) {
               console.log(e);
            } finally {
               setLoading(false);
            }
         }
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      getCarFunc();
   }, []);

   const handleProfile = (id) => {
      navigate(`/users/${id}`);
   };

   return (
      <>
         {loading ? (<div className=" h-screen w-screen bg-white fixed flex justify-center items-center" style={{zIndex: "9999"}}><LoaderIcon /></div>) : (null)}
         <div className="bg-slate-100 w-full h-auto flex flex-col items-center justify-center">
            <MenuBar />
            <div ref={ImagePreviewRef} style={{ height: "52px" }}></div>
            {usersCar ? (<div className=" w-full"><DeleteCar CarId={carId} /></div>) : (null)}
            <div className="w-full h-auto flex flex-col mb-4 bg-white">
               <PreviewSlider images={images} />
            </div>
            <div className="w-full py-4 px-2 mt-1 mb-3 bg-white rounded-t-md">
               <span className="text-xl font-light">{brand}</span>
               <span className="text-xl font-medium ml-1">{model}</span>
               <span className="text-xl ml-1 font-medium">{userTittle ? userTittle : null}</span>
            </div>
            <div ref={ProfileSectionRef} className="bg-white mt-5 w-full h-32 flex">
               <div className="w-1/3 flex justify-center items-center">
                  <div className="relative h-24 w-24 rounded-full object-cover overflow-hidden" style={{ border: "2px solid #534D56" }}>
                     <img onClick={() => handleProfile(userId)} className="h-full w-full object-cover" src={userImage} alt="" />
                  </div>
               </div>
               <div className="pl-2 w-2/3 flex flex-col justify-center">
                  <span className="text-xl">{username}</span>
                  <div className="w-2/3">
                     {usersCar ? (<div className=" h-10"></div>) : (<button className="msgButton" onClick={handleCreateChat}>Message</button>)}
                  </div>
               </div>
            </div>
            <div className="mt-5 bg-white rounded-2xl" style={{width: "91%"}}>
               <CarMainDetails date={year} power={power} gearbox={gearbox} mileage={mileage} fuel={fuel} />
            </div>
            <div ref={VehicleDetailsRef} className="mt-5 bg-white rounded-2xl" style={{width: "91%"}}>
               <CarSecondDetails 
               Brand={brand} 
               Model={model} 
               Year={year} 
               Mileage={mileage} 
               Condition={condition} 
               Category={category} 
               Performance={performance} 
               Drivetrain={driveTrain}
               DriveType={driveType}
               Fuel={fuel}
               VIN={VIN}
               TransmitionType={transmitionType}
               FirstRegistration={firstRegistration}
               Registration={registration}
               SeatNumber={SeatNumber}
               DoorNumber={DoorNumber}
               PollutantClass={pollutantClass}
               Owners={owners}
               ColorManufacturer={colorManufacturer}
               Color={color}
               Interior={interior}
               />
            </div>
            <div ref={AditionalOptionsRef} className="mt-16 bg-white rounded-2xl" style={{width: "91%"}}>
            <h3 className=" p-4 pb-2 font-medium text-white rounded-t-lg" style={{backgroundColor: "#1070FF"}}>Aditional options:</h3>
            {carOptions.map((options, index) => (
             <div key={options}>
              <div
                 className={`h-auto w-full p-2 flex justify-between items-center ${
                  index % 2 === 0 ? 'bg-white' :  'bg-slate-300'
                 }`}
               >
               <span className="font-medium font-normal">{options}</span>
              </div>
             </div>
            ))}
            </div>
            <div ref={AditionalInfoRef} className=" bg-white mt-16 mb-16 rounded-2xl" style={{width: "91%"}}>
               <h2 className=" text-3xl p-4" style={{color: "#1070FF"}}>Aditional info</h2>
               <div className=" w-full h-auto p-4" style={{minHeight: "250px"}}>{carBio ? (carBio) : ("No aditional info provided")}</div>
            </div>
            <div className="w-full flex flex-col bg-slate-50" style={{ height: "auto", color: "#534D56", borderTop: "3px solid black" }}>
               <div className="w-full flex flex-wrap" style={{ height: "250px" }}>
                  <div className="w-1/2 h-full flex flex-col p-5">
                     <span className="font-semibold" style={{ fontSize: "17px" }}>DriveMotors</span>
                     <div className="mt-4 flex flex-col gap-2 select-none">
                        <div className="cursor-pointer" onClick={() => scrollToSection(ImagePreviewRef)}>Images</div>
                        <div className="cursor-pointer" onClick={() => scrollToSection(ProfileSectionRef)}>Profile</div>
                        <div className="cursor-pointer" onClick={() => scrollToSection(VehicleDetailsRef)}>Car Details</div>
                        <div className="cursor-pointer" onClick={() => scrollToSection(AditionalOptionsRef)}>Aditional Info</div>
                        <div className="cursor-pointer" onClick={() => scrollToSection(AditionalInfoRef)}>Aditional Details</div>
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
            <Messages userId={tokenId} receiverId={userId}/>
         </div>
      </>
   );
};

export default CarDetails;
