import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkGetSingleSpot } from "../../store/spotsReducer";
import { thunkGetReviews } from "../../store/reviews";
import { NavLink, useParams } from "react-router-dom";
import "./GetSingleSpot.css";

export default function SingleSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(thunkGetSingleSpot(spotId));
    dispatch(thunkGetReviews(spotId));
  }, [dispatch, spotId]);

  const singleSpot = useSelector((state) => {
    return state.spots.singleSpot;
  });

  const allReviews = useSelector((state) => {
    return Object.values(state.reviews.getReviews);
  });
  console.log(allReviews);

  if (!singleSpot || !singleSpot.name) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="spot-name">
        <h1>{singleSpot.name}</h1>
      </div>
      <div className="spot-location">
        <h2>
          {singleSpot.address},{singleSpot.city},{singleSpot.country}
        </h2>
      </div>
      {singleSpot.SpotImages.map((spotImage) => {
        return (
          <img src={spotImage.url} alt={singleSpot.name} key={spotImage.id} />
        );
      })}
      <div className="spot-desc">
        <h3>{singleSpot.description}</h3>
      </div>
      <div className="spot-price">
        <h3>{singleSpot.price}</h3>
      </div>
      <div className="reviews">
        {allReviews.map((review) => {
          return (
            <div className="review-data">
              <h3>{review.User.firstName}</h3>
              <h3>{review.review}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
