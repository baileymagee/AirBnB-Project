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
    <div>
      {Object.values(spots).map((spot) => {
        return (
          <div className="splash-page">
            <NavLink to={`/spots/${spot.id}`}>
              <div className="spot-image">
                <img src={spot.previewImage} alt={spot.name} />
              </div>
            </NavLink>
            <p>
              {spot.city}, {spot.state}
            </p>
            {spot.avgRating ? <p>{spot.avgRating}</p> : <p>New</p>}
            <p>{`$${spot.price} night`}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Loading Spots</h1>
  );
}
