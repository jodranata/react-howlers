import {
  GET_HOLLERS,
  LOADING_DATA,
  LIKE_HOLLER,
  UNLIKE_HOLLER,
  DELETE_HOLLER,
  POST_HOLLER,
  GET_A_HOLLER,
  CLEAR_A_HOLLER,
  POST_COMMENT,
  COMMENT_LOADING,
  COMMENT_LOADED,
  GET_USER_DATA,
  LOADED_DATA
} from '../constants/ActionsTypes';

const INITIAL_STATE = {
  hollers: [],
  holler: {},
  loading: false,
  userData: {},
  commentLoading: false
};

const handleLoadingData = (state, action) => ({
  ...state,
  loading: true
});

const handleGetHollers = (state, action) => ({
  ...state,
  hollers: action.payload
});

const handleLoadedData = state => ({
  ...state,
  loading: false
});

const handleClearAHoller = (state, action) => ({
  ...state,
  holler: {}
});

const handleLikeAndUnlikeHoller = (state, action) => {
  //  copy current state by the value
  const newState = JSON.parse(JSON.stringify(state));
  //  renew or change the value of newState
  const index = newState.hollers.findIndex(
    holler => holler.hollerID === action.payload.hollerID
  );
  newState.hollers[index].likeCount = action.payload.likeCount;
  //  if the state has holler and the hollerID is the same with payloads,
  //  modify the likeCount of newState.holler
  if (newState.holler.hollerID === action.payload.hollerID) {
    newState.holler.likeCount = action.payload.likeCount;
  }
  //  the like/unlike holler of newState
  return {
    ...state,
    hollers: newState.hollers,
    holler: newState.holler
  };
};

const handleDeleteHoller = (state, action) => {
  const remainingHollers = state.hollers.filter(
    holler => holler.hollerID !== action.payload
  );
  return {
    ...state,
    hollers: remainingHollers
  };
};

const handlePostHoller = (state, action) => ({
  ...state,
  hollers: [action.payload, ...state.hollers]
});

const handleGetHollerDetails = (state, action) => ({
  ...state,
  holler: action.payload
});

const handlePostComment = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  const index = newState.hollers.findIndex(
    holler => holler.hollerID === action.payload.hollerID
  );
  newState.hollers[index].commentCount++;
  if (newState.holler.hollerID === action.payload.hollerID) {
    newState.holler.commentCount++;
    newState.holler.comments = [action.payload, ...newState.holler.comments];
  }
  return {
    ...state,
    hollers: newState.hollers,
    holler: newState.holler
  };
};

const handleCommentLoading = state => ({
  ...state,
  commentLoading: true
});

const handleCommentLoaded = state => ({
  ...state,
  commentLoading: false
});

const handleGetUserData = (state, action) => ({
  ...state,
  userData: action.payload
});

const DataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HOLLERS:
      return handleGetHollers(state, action);
    case LIKE_HOLLER:
    case UNLIKE_HOLLER:
      return handleLikeAndUnlikeHoller(state, action);
    case LOADING_DATA:
      return handleLoadingData(state, action);
    case LOADED_DATA:
      return handleLoadedData(state);
    case DELETE_HOLLER:
      return handleDeleteHoller(state, action);
    case POST_HOLLER:
      return handlePostHoller(state, action);
    case GET_A_HOLLER:
      return handleGetHollerDetails(state, action);
    case CLEAR_A_HOLLER:
      return handleClearAHoller(state, action);
    case POST_COMMENT:
      return handlePostComment(state, action);
    case COMMENT_LOADING:
      return handleCommentLoading(state);
    case COMMENT_LOADED:
      return handleCommentLoaded(state);
    case GET_USER_DATA:
      return handleGetUserData(state, action);
    default:
      return state;
  }
};
export default DataReducer;
