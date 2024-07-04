import React from "react";
import Slider from "react-slick";
import CardCar from "./CardCar";
import { useSelector } from "react-redux";

const CardSlider = () => {
   const cars = useSelector((state) => state.cardata.cars);

   const settings = {
      dots: true,
      infinite: cars.length > 1,
      speed: 400,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
   };

   return (
      <div className="slider-container">
         <Slider {...settings}>
            {cars.map((car) => (
               <CardCar
                  key={car.id} // Assuming each car has a unique id
                  brand={car.Brand}
                  model={car.Model}
                  image={car.CarImages[0]} // Adjust as per your API response structure
                  date={car.Year}
                  power={car.Performance}
                  gearbox={car.TransmitionType}
                  mileage={car.Mileage}
                  fuel={car.Fuel}
                  price={car.Price}
                  id={car._id} // Assuming _id is the unique identifier
               />
            ))}
         </Slider>
      </div>
   );
};

export default CardSlider;
