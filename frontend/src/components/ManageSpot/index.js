import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkManageSpots } from "../../store/spotsReducer";
import { NavLink, useHistory } from "react-router-dom";
import DeleteSpot from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";
import "./ManageSpot.css";

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
        <button className="manage-spot-create-btn">Create a Spot</button>
      </NavLink>
      <div className="manage-inner">
        {Object.values(spots).map((spot) => {
          return (
            <div className="spot-info">
              <NavLink to={`/spots/${spot.id}`}>
                <div className="spot-image">
                  <img
                    src={spot.previewImage}
                    alt={spot.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="bottom-row">
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <div className="star-rating">
                    <i id="star-img" className="fa-solid fa-star"></i>
                    {spot.avgRating ? (
                      <p>{Number(spot.avgRating).toFixed(1)}</p>
                    ) : (
                      <p>New</p>
                    )}
                  </div>
                </div>
                <p>{`$${spot.price} night`}</p>
              </NavLink>
              <div className="buttons">
                <button
                  onClick={() => history.push(`/edits/spots/${spot.id}`)}
                  className="button-edit"
                >
                  Update
                </button>
                <OpenModalButton
                  className="delete-modal"
                  buttonText="Delete"
                  modalComponent={<DeleteSpot spot={spot} />}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <h1>Loading Spots</h1>
  );
}
