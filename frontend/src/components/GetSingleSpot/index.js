import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { thunkGetSingleSpot } from "../../store/spotsReducer"
import { NavLink, useParams } from "react-router-dom"
import './GetSingleSpot.css'

export default function SingleSpot() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    useEffect(() => {
        dispatch(thunkGetSingleSpot(spotId))
    }, [dispatch, spotId])

    const singleSpot = useSelector((state) => {
        // console.log(state)
        return state.spots.singleSpot
    })

    if (!singleSpot || !singleSpot.name) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <div className="spotName">
                <h1>{singleSpot.name}</h1>
            </div>
            <div className="spotLocation">
                <h2>{singleSpot.address},
                    {singleSpot.city},
                    {singleSpot.country}
                </h2>
            </div>
            {singleSpot.SpotImages.map((spotImage) => {
                return <img src={spotImage.url} alt={singleSpot.name} key={spotImage.id} />
            })}
            <div className="spotDesc">
                <h3>{singleSpot.description}</h3>
            </div>
            <div className="spotPrice">
                <h3>{singleSpot.price}</h3>
            </div>

        </div>
    )
}
