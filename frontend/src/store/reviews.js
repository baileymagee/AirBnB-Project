import { csrfFetch } from "./csrf";

const GET_REVIEWS = "review/getReviews";

//actions
const actionGetReviews = (spotId) => {
  return {
    type: GET_REVIEWS,
    payload: spotId,
  };
};

//thunks
export const thunkGetReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetReviews(data));
    return data;
  }
};

//reducers
const initialState = {
  getReviews: {},
};

const normalize = (reviews) => {
  const data = {};
  reviews.forEach((review) => {
    data[review.id] = review;
  });
//   console.log(data)
  return data;
};

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state };
      newState.getReviews = normalize(action.payload.Reviews);
      return newState;

    default:
      return state;
  }
};

export default reviewReducer;
