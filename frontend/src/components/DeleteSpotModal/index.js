import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteSpot } from "../../store/spotsReducer";
import "./DeleteSpotModal.css";

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
    <div className="spot-delete-modal">
      <div className="spot-del-content">
        <h1 className="del-spot-header">Confirm Delete</h1>
        <p className="del-spot-desc">
          Are you sure you want to remove this spot from the listings?
        </p>
        <button
          className={"delete-btn"}
          onClick={handleSubmit}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Yes (Delete Spot)
        </button>
        <button
          className={"delete-btn"}
          onClick={clickNo}
          style={{ backgroundColor: "darkgray" }}
        >
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}
