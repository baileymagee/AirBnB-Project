import { csrfFetch } from "./csrf";
import { thunkGetSingleSpot } from "./spotsReducer";

const GET_REVIEWS = "review/getReviews";
const DELETE_REVIEW = "review/deleteReview";

//actions
const actionGetReviews = (spotId) => {
  return {
    type: GET_REVIEWS,
    payload: spotId,
  };
};

const actionDeleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
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

export const thunkPostReview = (data, spotId) => async (dispatch) => {
  const { review, stars } = data;

  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({ review, stars }),
  });

  if (response.ok) {
    dispatch(thunkGetReviews(spotId));
    dispatch(thunkGetSingleSpot(spotId));
  }
};

export const thunkDeleteReview = (reviewId, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteReview(reviewId));
    dispatch(thunkGetSingleSpot(spotId));
    return data
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
  return data;
};

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state };
      newState.getReviews = normalize(action.payload.Reviews);
      return newState;

    case DELETE_REVIEW:
      newState = { ...state, review: { ...state.getReviews }}
      delete newState.getReviews[action.payload]
      return newState

    default:
      return state;
  }
};

export default reviewReducer;
