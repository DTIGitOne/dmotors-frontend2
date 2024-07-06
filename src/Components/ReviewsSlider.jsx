import React from "react";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

const ReviewsSlider = () => {
  const reviews = useSelector((state) => state.review.reviews);

  const settings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 400,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container2">
      <Slider {...settings}>
        {reviews.map((rev) => (
               <ReviewCard
                  key={rev.id}
                  reviewMessage={rev.ReviewMessage}
                  pfp={rev.pfpURL}
                  rating={rev.rating}
               />
            ))}
      </Slider>
    </div>
  );
}

export default ReviewsSlider;