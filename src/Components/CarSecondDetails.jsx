

const CarSecondDetails = ({Brand, Model, Year, Mileage, Condition, Category, Performance, Drivetrain, DriveType, Fuel, VIN, TransmitionType, FirstRegistration, Registration, SeatNumber, DoorNumber, PollutantClass, Owners, ColorManufacturer, Color, Interior}) => {
   return (
   <div>
      <h3 className=" p-4 pb-2 font-medium text-white rounded-t-lg" style={{backgroundColor: "#1070FF"}}>Vehicle details:</h3>
      <div className=" h-auto w-full" >
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Brand:</span><span>{Brand}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Model:</span><span>{Model}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Make year:</span><span>{Year}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Mileage:</span><span>{Mileage} KM</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Condition:</span><span>{Condition}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Category:</span><span>{Category}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Performance:</span><span>{Performance} (kW)</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Drive train:</span><span>{Drivetrain}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Drive type:</span><span>{DriveType}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Fuel:</span><span>{Fuel}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">VIN:</span><span>{VIN}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Transmition:</span><span>{TransmitionType}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">First Registration:</span><span>{FirstRegistration}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Registration:</span><span>{Registration}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Seats:</span><span>{SeatNumber}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Doors:</span><span>{DoorNumber}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Pollutant Class:</span><span>{PollutantClass}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Owners:</span><span>{Owners}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Color(Manufacturer):</span><span>{ColorManufacturer}</span>
       </div>
       <div className=" h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Color:</span><span>{Color}</span>
       </div>
       <div className=" bg-slate-300 h-auto w-full p-2 flex justify-between items-center">
         <span className=" font-medium">Interior:</span><span>{Interior}</span>
       </div>
      </div>
   </div>
);
}

export default CarSecondDetails;