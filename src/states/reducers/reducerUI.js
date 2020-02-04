import {
  SET_ERRORS,
  CLEAR_ERRORS,
  UI_LOADING,
  UI_LOADED
} from '../constants/ActionsTypes';

const INITIAL_STATE = {
  loading: false,
  errors: null
};

const handleErrors = (state, action) => ({
  ...state,
  loading: false,
  errors: action.payload
});

const handleClearErrors = (state, action) => ({
  ...state,
  loading: false,
  errors: null
});

const handleUILoading = (state, action) => ({
  ...state,
  loading: true
});

const handleUILoaded = (state, action) => ({
  ...state,
  loading: false
});

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return handleErrors(state, action);
    case CLEAR_ERRORS:
      return handleClearErrors(state, action);
    case UI_LOADING:
      return handleUILoading(state, action);
    case UI_LOADED:
      return handleUILoaded(state, action);
    default:
      return state;
  }
};
export default UIReducer;
