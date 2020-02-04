import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  UI_LOADING,
  SET_AUTH,
  SET_UNAUTH,
  LOADING_USER,
  LIKE_HOLLER,
  UNLIKE_HOLLER,
  MARK_NOTIF_READ
} from '../constants/ActionsTypes';

const INITIAL_STATE = {
  authenticated: false,
  credentials: {},
  loading: false,
  likes: [],
  notifications: []
};

const handleAuth = (state, action) => ({
  ...state,
  authenticated: true,
  loading: true
});

const handleUnAuth = (state, action) => ({
  ...state,
  loading: false
});

const handleSetUser = (state, action) => ({
  authenticated: true,
  loading: false,
  ...action.payload
});

const handleLoadingUser = (state, action) => ({
  ...state,
  loading: true
});

const handleLikeHoller = (state, action) => ({
  ...state,
  likes: [
    ...state.likes,
    {
      userName: state.credentials.userName,
      hollerID: action.payload.hollerID
    }
  ]
});

const handleUnlikeHoller = (state, action) => ({
  ...state,
  likes: state.likes.filter(
    holler => holler.hollerID !== action.payload.hollerID
  )
});

const handleMarkNotifRead = state => {
  const newState = JSON.parse(JSON.stringify(state));
  // eslint-disable-next-line no-param-reassign
  newState.notifications.forEach(notif => (notif.read = true));
  return {
    ...state,
    notifications: newState.notifications
  };
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH:
      return handleAuth(state, action);
    case SET_UNAUTH:
      return handleUnAuth(INITIAL_STATE, action);
    case SET_USER:
      return handleSetUser(state, action);
    case LOADING_USER:
      return handleLoadingUser(state, action);
    case LIKE_HOLLER:
      return handleLikeHoller(state, action);
    case UNLIKE_HOLLER:
      return handleUnlikeHoller(state, action);
    case MARK_NOTIF_READ:
      return handleMarkNotifRead(state);
    default:
      return state;
  }
};
export default UserReducer;
