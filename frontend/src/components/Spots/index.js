import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { thunkGetAllSpots } from "../../store/spotsReducer"
import './Spots.css';

export default function Spots() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkGetAllSpots()).then(() => setIsLoaded(true))
    }, [dispatch])

    const spots = useSelector((state) => {
        console.log(state)
        return state.spots
    })
    return isLoaded ?(
        <div>
            {Object.keys(spots).map(key => {
                const spot = spots[key]
                console.log(spot)
                return (
                    <p>
                        {spot.state}
                    </p>
                )
            })}

        </div>
    ): <h1>Loading Spots</h1>
}
