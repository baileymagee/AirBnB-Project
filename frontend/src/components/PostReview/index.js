import { useModal } from "../../context/Modal";
import { useState } from "react";
import { thunkPostReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./PostReview.css";

export default function PostReview({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    };

    dispatch(thunkPostReview(newReview, spotId));
    closeModal();
  };

  console.log(stars)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="modal-title">
          <h1>How was your stay?</h1>
        </div>
        <div className="modal-text">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={"Leave a Review here..."}
          ></textarea>
        </div>
        <div className="star">
            <label>
          <input
            type="radio"
            name="star"
            value={stars}
            className="stars"
            onClick={() => setStars(1)}
          />
          <i className="fa-regular fa-star"></i>
          </label>
          <label>
          <input
            type="radio"
            name="star"
            value={stars}
            className="stars"
            onClick={() => setStars(2)}
          />
          <i className="fa-regular fa-star"></i>
          </label>
          <label>
          <input
            type="radio"
            name="star"
            value={stars}
            className="stars"
            onClick={() => setStars(3)}
          />
          <i className="fa-regular fa-star"></i>
          </label>
          <label>
          <input
            type="radio"
            name="star"
            value={stars}
            className="stars"
            onClick={() => setStars(4)}
          />
          <i className="fa-regular fa-star"></i>
          </label>
          <label>
          <input
            type="radio"
            name="star"
            value={stars}
            className="stars"
            onClick={() => setStars(5)}
          />
          <i className="fa-regular fa-star"></i>
          </label>
        </div>
        <button>Submit Your Review</button>
      </form>
    </div>
  );
}
