import Spots from "../components/GetAllSpots";
import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_ONE_SPOT = "spots/getOneSpot";
const ADD_SPOT = "spots/addSpot";

//actions
const actionGetAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
};

const actionGetSingleSpot = (spots) => {
  return {
    type: GET_ONE_SPOT,
    payload: spots,
  };
};

const actionAddSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

//thunks

export const thunkGetAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllSpots(data));
    return data;
  }
};

export const thunkGetSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetSingleSpot(data));
    return data;
  }
};

export const thunkAddSpot = (data, imgArray) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(actionAddSpot(newSpot));
    for (let img of imgArray) {
      await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "POST",
        body: JSON.stringify(img),
      });
    }
    return newSpot.id;
  }
};

//reducers
const initialState = {
  allSpots: {},
  singleSpot: {},
};

const normalize = (spots) => {
  const data = {};
  // console.log({spots})
  spots.forEach((spot) => {
    data[spot.id] = spot;
  });
  // console.log(data)
  return data;
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state };
      newState.allSpots = normalize(action.payload.Spots);
      return newState;

    case GET_ONE_SPOT:
      newState = { ...state };
      newState.singleSpot = action.payload;
      return newState;

    case ADD_SPOT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    default:
      return state;
  }
};

export default spotsReducer;
