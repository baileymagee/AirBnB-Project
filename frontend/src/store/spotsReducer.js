const GET_ALL_SPOTS = 'spots/getAllSpots'

//actions
const actionGetAllSpots = (spots) => {
    let spotsObject = {}
    console.log(spots)
    spots.forEach(spot => {
        spotsObject[spot.id] = spot
    });
    return {
        type: GET_ALL_SPOTS,
        payload: spotsObject
    }
}


//thunks

export const thunkGetAllSpots = () => async (dispatch) => {
const response = await fetch('/api/spots')
const data = await response.json();
dispatch(actionGetAllSpots(data.Spots));
return response;
}

//reducers
const initialState = {allSpots: {}};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_SPOTS:
            newState = action.payload
            return newState
        default:
            return state
    }
}

export default spotsReducer;
