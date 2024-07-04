import CarTypeInput from "./CarTypeInput";

const SearchBox = () => {
  

   return (
      <div className="h-auto flex flex-col gap-4 text-center items-center bg-white font-semibold rounded-3xl shadow-xl p-6 box-border" style={{ width: '85%' , color: "#534D56"}}>
         <span className="text-2xl">Look for the best deals on DriveMotors</span>
         <CarTypeInput />
      </div>
   );
}

export default SearchBox;