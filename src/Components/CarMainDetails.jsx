import DateIcon from "../SVG/DateIcon";
import FuelIcon from "../SVG/FuelIcon";
import MileageIcon from "../SVG/MileageIcon";
import MotorIcon from "../SVG/MotorIcon";
import TransmitionTypeIcon from "../SVG/TransmitionTypeIcon";

const CarMainDetails = ({date, power, gearbox, mileage, fuel}) => {
   return (
   <div>
      <div className=" h-28 w-full flex justify-center items-center" >
      <div className=" h-full flex flex-wrap">
               <div className=" h-1/2 w-1/3 flex justify-center items-center gap-2">
                  <DateIcon />
                  <div className=" flex justify-center items-center w-2/3 h-1/2 p-1 bg-slate-300 rounded-xl" style={{fontSize: "13px", fontWeight: "600"}}>{date}</div>
               </div>
               <div className=" h-1/2 w-1/3 flex justify-center items-center gap-2">
                  <MotorIcon />
                  <div className=" flex justify-center items-center p-1 w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "13px", fontWeight: "600"}}>{power} kW</div>
               </div>
               <div className=" h-1/2 w-1/3 flex justify-center items-center gap-2">
                  <TransmitionTypeIcon />
                  <div className=" flex justify-center items-center p-1 w-2/3 h-1/2  bg-slate-300 rounded-xl" style={{fontSize: "12px", fontWeight: "600"}}>{gearbox}</div>
               </div>
               <div className=" h-1/2 w-1/3 flex justify-center items-center gap-2">
                  <MileageIcon />
                  <div className=" flex justify-center items-center p-1 w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "11px", fontWeight: "600"}}>{mileage} Km</div>
               </div>
               <div className=" h-1/2 w-1/3 flex justify-center items-center gap-2 pl-1">
                  <FuelIcon />
                  <div className=" flex justify-center items-center p-1 w-2/3 h-1/2 bg-slate-300 rounded-xl" style={{fontSize: "13px", fontWeight: "600"}}>{fuel}</div>
               </div>
            </div>
      </div>
   </div>
);
}

export default CarMainDetails;