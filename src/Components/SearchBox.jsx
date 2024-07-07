import CarTypeInput from "./CarTypeInput";
import '../CustomCSS/SearchBox.css'

const SearchBox = () => {
  
   return (
      <div id="searchBox" className=" h-auto flex flex-col gap-4 text-center items-center bg-white font-semibold rounded-3xl shadow-xl p-6 box-border" style={{ color: "#534D56"}}>
         <span id="boxText" className="text-2xl">Look for the best deals on DriveMotors</span>
         <CarTypeInput />
      </div>
   );
}

export default SearchBox;