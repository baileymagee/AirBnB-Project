import Spots from "../components/GetAllSpots";
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spots/getAllSpots'

//actions
const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
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


//reducers
const initialState = {allSpots: {}};

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

            default:
                    return state;

    }
}

export default spotsReducer;
