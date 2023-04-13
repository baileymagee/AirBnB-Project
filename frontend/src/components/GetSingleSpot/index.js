import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetSingleSpot } from "../../store/spotsReducer";
import { thunkGetReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";
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

  function onClick() {
    alert("Feature coming soon...");
  }

  const reviewDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = new Date(date).getMonth();
    return monthNames[month];
  };

  return (
    <div>
      <div className="spot-name">
        <h1>{singleSpot.name}</h1>
      </div>
      <div className="spot-location">
        <h2>
          {singleSpot.address}, {singleSpot.city}, {singleSpot.country}
        </h2>
      </div>
      {singleSpot.SpotImages.map((spotImage) => {
        return (
          <img
            className="spot-image"
            src={spotImage.url}
            alt={singleSpot.name}
            key={spotImage.id}
          />
        );
      })}
      <div className="middle">
        <div className="left-side">
          <div className="spot-host">
            <h2>
              {`Hosted by ${singleSpot.Owner.firstName} ${singleSpot.Owner.lastName}`}
            </h2>
          </div>
          <div className="spot-desc">
            <h3>{singleSpot.description}</h3>
          </div>
        </div>
        <div className="right-box">
          <div className="top-box">
            <div className="spot-price">
              <h3>{`$${singleSpot.price} night`}</h3>
            </div>
            <div className="star-reviews">
              <i id="star" className="fa-solid fa-star"></i>
              {singleSpot.numReviews > 1 ? (
                <h2>
                  {Number(singleSpot.avgRating).toFixed(1)} · {singleSpot.numReviews} reviews
                </h2>
              ) : null}
              {singleSpot.numReviews === 1 ? (
                <h2>
                  {Number(singleSpot.avgRating).toFixed(1)} · {singleSpot.numReviews} review
                </h2>
              ) : null}
              {singleSpot.numReviews === 0 ? (
                <h2> New</h2>
              ) : null}
            </div>
          </div>
          <div className="reserve-button">
            <button className="right-button" onClick={onClick}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <div className="reviews">
        <div className="star-img">
          <i id="star1"className="fa-solid fa-star"></i>
          {singleSpot.numReviews > 1 ? (
            <h2>
              {Number(singleSpot.avgRating).toFixed(1)} · {singleSpot.numReviews} reviews
            </h2>
          ) : null}
          {singleSpot.numReviews === 1 ? (
            <h2>
              {Number(singleSpot.avgRating).toFixed(1)} · {singleSpot.numReviews} review
            </h2>
          ) : null}
          {singleSpot.numReviews === 0 ? (
            <h2> New</h2>
          ) : null}
        </div>
        {sessionUser &&
          sessionUser?.id !== singleSpot?.ownerId &&
          !allReviews
            .map((review) => review?.userId)
            .includes(sessionUser?.id) && (
            <OpenModalButton
              className="post-review"
              buttonText="Post Your Review"
              modalComponent={<PostReview spotId={spotId} />}
            />
          )}
        {allReviews.reverse().map((review) => {
          return (
            <div className="review-data">
              <h3>{review.User.firstName}</h3>
              <h3>
                {reviewDate(review.createdAt)}{" "}
                {new Date(review.createdAt).getFullYear()}
              </h3>
              <h3>{review.review}</h3>
              {sessionUser?.id === review.User.id ? (
                <OpenModalButton
                  className="delete-review"
                  buttonText="Delete Review"
                  modalComponent={
                    <DeleteReview reviewId={review.id} spotId={spotId} />
                  }
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
