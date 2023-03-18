import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkManageSpots } from "../../store/spotsReducer";
import { NavLink, useHistory } from "react-router-dom";
import DeleteSpot from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";

export default function ManageSpot() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkManageSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const spots = useSelector((state) => {
    return state.spots.allSpots;
  });

  return isLoaded ? (
    <div className="manage-home">
      <h1>Manage Spot</h1>
      <NavLink to={"/spots/new"}>
        <button>Create a Spot</button>
      </NavLink>
      {Object.values(spots).map((spot) => {
        return (
          <div className="spot-info">
            <NavLink to={`/spots/${spot.id}`}>
              <div className="spot-image">
                <img src={spot.previewImage} alt={spot.name} />
              </div>
            </NavLink>
            <p>
              {spot.city}, {spot.state}
            </p>
            <p>{`$${spot.price} night`}</p>
            <NavLink to={`/edits/spots/${spot.id}`}>Update</NavLink>
            <OpenModalButton
              className="delete-modal"
              buttonText="Delete"
              modalComponent={<DeleteSpot spot={spot} />}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Loading Spots</h1>
  );
}
