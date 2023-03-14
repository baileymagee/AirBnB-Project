import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { thunkGetAllSpots } from "../../store/spotsReducer"
import './GetAllSpots.css';

export default function Spots() {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkGetAllSpots()).then(() => setIsLoaded(true))
    }, [dispatch])

    const spots = useSelector((state) => {
        return state.spots.allSpots
    })

    return isLoaded ?(
        <div>
            {Object.keys(spots).map(key => {
                const spot = spots[key]
                return (
                    <div className="spot-image" key={key}>
                        <img src={spot.previewImage} alt={spot.name} />
                    <p>
                        {spot.state}
                    </p>
                    </div>
                )
            })}

        </div>
    ): <h1>Loading Spots</h1>
}
