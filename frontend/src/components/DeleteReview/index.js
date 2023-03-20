import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/reviews";

export default function DeleteReview({reviewId, spotId}) {
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
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleSubmit} style={{backgroundColor: 'red'}}>Yes (Delete Review)</button>
      <button onClick={clickNo} style={{backgroundColor: 'darkgray'}}>No (Keep Review)</button>
    </div>
  );
}
