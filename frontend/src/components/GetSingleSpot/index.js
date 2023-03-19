import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkGetSingleSpot } from "../../store/spotsReducer";
import { thunkGetReviews } from "../../store/reviews";
import { NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import "./GetSingleSpot.css";
import PostReview from "../PostReview";
import DeleteReview from "../DeleteReview";

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

  const sessionUser = useSelector((state) => {
    return state.session.user;
  });


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
        <OpenModalButton
          className="post-review"
          buttonText="Post Your Review"
          modalComponent={<PostReview spotId={spotId} />}
        />
        {allReviews.map((review) => {
          console.log(review)
          return (
            <div className="review-data">
              <h3>{review.User.firstName}</h3>
              <h3>{review.review}</h3>
              {sessionUser?.id === review.User.id ? (
                <OpenModalButton
                  className="delete-review"
                  buttonText="Delete Review"
                  modalComponent={<DeleteReview reviewId={review.id} spotId={spotId} />}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
