import StarIcon from "../SVG/StarIcon";

const ReviewCard = ({reviewMessage , pfp , rating}) => {
   const totalStars = 5;
   const filledColor = "#1070FF";
   const emptyColor = "#002D71";

   const starColors = Array(totalStars).fill(emptyColor).map((colors, index) => {
      return index < rating ? filledColor : emptyColor;
    });

   return (
      <div className=" h-full w-full flex justify-center items-center mb-4">
      <div className="reviewBox bg-white">
         <div className=" flex justify-around" style={{ height: "80%"}}>
            <div className="h-full flex justify-center pt-4" style={{ width: "30%"}}>
               <div className=" mt-5 rounded-full overflow-hidden h-24 w-24">
                 <img className=" h-full w-full object-cover" src={pfp} alt="" />
               </div>
            </div>
            <div className="h-full text-left text-xl p-5 pt-10 pl-0 flex" style={{ width: "60%"}}>
               <p>{reviewMessage}</p>
            </div>
         </div>
         <div className=" flex justify-center items-center" style={{ height: "20%"}}>
            <div className=" flex gap-2">
            {starColors.map((colors, index) => (
              <StarIcon key={index} color={colors} />
            ))}
            </div>
         </div>
      </div>
      </div>
   );
}

export default ReviewCard;