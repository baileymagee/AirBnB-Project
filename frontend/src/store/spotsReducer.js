import Spots from "../components/GetAllSpots";
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_ONE_SPOT = 'spots/getOneSpot'

//actions
const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

const actionGetSingleSpot = (spots) => {
    return {
        type:GET_ONE_SPOT,
        payload: spots
    }
}


//thunks

export const thunkGetAllSpots = () => async (dispatch) => {
const response = await csrfFetch('/api/spots')
if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllSpots(data));
    return data
    }
}

export const thunkGetSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSingleSpot(data));
        return data;
    }
}



//reducers
const initialState = {
 allSpots: {},
 singleSpot: {}
};

const normalize = (spots) => {
    const data = {}
    // console.log({spots})
        spots.forEach(spot => {
            data[spot.id] = spot
        })
        // console.log(data)
        return data
}


const spotsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_SPOTS:
            // console.log({action})
            newState = {...state}
            newState.allSpots = normalize(action.payload.Spots)
            return newState

        case GET_ONE_SPOT:
            newState = {...state}
            newState.singleSpot = action.payload
             return newState

            default:
                    return state;

    }
}

export default spotsReducer;
