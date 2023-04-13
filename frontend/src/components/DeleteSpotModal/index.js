import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteSpot } from "../../store/spotsReducer";
import './DeleteSpotModal.css';

export default function DeleteSpot({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const clickNo = () => {
    closeModal();
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteSpot(spot.id));
    closeModal();
  };
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={handleSubmit} style={{backgroundColor: 'red'}}>Yes (Delete Spot)</button>
      <button onClick={clickNo} style={{backgroundColor: 'darkgray'}}>No (Keep Spot)</button>
    </div>
  );
}
