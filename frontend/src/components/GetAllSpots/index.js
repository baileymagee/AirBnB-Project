import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { thunkGetAllSpots } from "../../store/spotsReducer";
import { NavLink, useParams } from "react-router-dom";
import "./GetAllSpots.css";

export default function Spots() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkGetAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const spots = useSelector((state) => {
    return state.spots.allSpots;
  });

  return isLoaded ? (
    <div className="all-spots">
      {Object.values(spots).map((spot) => {
        return (
          <div className="splash-page">
            <NavLink to={`/spots/${spot.id}`}>
              <div className="spot-image">
                <img
                  className="preview-image"
                  src={spot.previewImage}
                  alt={spot.name}
                  title={spot.name}
                />
              </div>
              <div className="under-img">
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
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Loading Spots</h1>
  );
}
