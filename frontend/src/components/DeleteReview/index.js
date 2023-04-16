import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/reviews";
import "./DeleteReview.css";

export default function DeleteReview({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const clickNo = () => {
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteReview(reviewId, spotId));
    closeModal();
  };
  return (
    <div className="review-delete-modal">
      <div className="del-content">
        <h1 className="del-review-header">Confirm Delete</h1>
        <p className="del-review-desc">
          Are you sure you want to delete this review?
        </p>

        <button className={"delete-review-btn"} onClick={handleSubmit} style={{ backgroundColor: "red", color: "white" }}>
          Yes (Delete Review)
        </button>
        <button className={"delete-review-btn"}onClick={clickNo} style={{ backgroundColor: "darkgray" }}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}
