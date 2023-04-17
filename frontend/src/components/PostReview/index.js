import { useModal } from "../../context/Modal";
import { useState } from "react";
import { thunkPostReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import "./PostReview.css";


export default function PostReview({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [hoverStar, setHoverStar] = useState(null);

  const isSubmitDisabled = review.length < 10 || stars.length <= 0;
  
  const MAX_STARS = 5;

  const handleStarClick = (num) => {
    setStars(num);
  };

  const mouseOn = (num) => {
    setHoverStar(num);
  };

  const mouseOff = () => {
    setHoverStar(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    };

    dispatch(thunkPostReview(newReview, spotId));
    closeModal();
  };

  const starElements = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    const starClass = i <= (hoverStar || stars) ? "fa-solid" : "fa-regular";
    starElements.push(
      <label key={i}>
        <input
          type="radio"
          name="star"
          value={i}
          className="stars"
          onClick={() => handleStarClick(i)}
        />
        <i
          className={`fa-star ${starClass}`}
          onMouseEnter={() => mouseOn(i)}
          onMouseLeave={mouseOff}
        ></i>
      </label>
    );
  }

  return (
    <div className="post-review-modal">
      <form onSubmit={handleSubmit}>
        <div className="modal-title">
          <h1>How was your stay?</h1>
        </div>
        <div>
          <textarea
            className="modal-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={"Leave a Review here..."}
          ></textarea>
        </div>
        <div className="star">
          {starElements}
          <p className="stars-text">Stars</p>
        </div>
        <button
          className={"submit-review-btn"}
          disabled={isSubmitDisabled}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}
