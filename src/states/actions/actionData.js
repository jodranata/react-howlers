import axios from 'axios';
import {
  GET_HOLLERS,
  LOADING_DATA,
  LOADED_DATA,
  LIKE_HOLLER,
  UNLIKE_HOLLER,
  DELETE_HOLLER,
  POST_HOLLER,
  UI_LOADING,
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_A_HOLLER,
  CLEAR_A_HOLLER,
  UI_LOADED,
  POST_COMMENT,
  COMMENT_LOADING,
  COMMENT_LOADED,
  GET_USER_DATA
} from '../constants/ActionsTypes';

export const getHollersAction = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/hollers')
    .then(res => {
      dispatch({ type: GET_HOLLERS, payload: res.data });
      dispatch({ type: LOADED_DATA });
    })
    .catch(err => {
      dispatch({ type: GET_HOLLERS, payload: [] });
      dispatch({ type: LOADED_DATA });
    });
};

export const likeHollerAction = hollerID => dispatch => {
  axios
    .get(`/holler/${hollerID}/like`)
    .then(res => dispatch({ type: LIKE_HOLLER, payload: res.data }))
    .catch(err => console.error(err));
};

export const unlikeHollerAction = hollerID => dispatch => {
  axios
    .get(`/holler/${hollerID}/unlike`)
    .then(res => dispatch({ type: UNLIKE_HOLLER, payload: res.data }))
    .catch(err => console.error(err));
};

export const deleteAHollerAction = hollerID => dispatch => {
  axios
    .delete(`/holler/${hollerID}`)
    .then(res => dispatch({ type: DELETE_HOLLER, payload: hollerID }))
    .catch(err => console.error(err));
};

export const postHollerAction = newHoller => dispatch => {
  dispatch({ type: UI_LOADING });
  axios
    .post('/holler', newHoller)
    .then(res => {
      dispatch({ type: POST_HOLLER, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const clearErrorsAction = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getAHollerAction = hollerID => dispatch => {
  dispatch({ type: UI_LOADING });
  axios
    .get(`/holler/${hollerID}`)
    .then(res => {
      dispatch({ type: GET_A_HOLLER, payload: res.data });
      dispatch({ type: UI_LOADED });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearAHollerAction = () => dispatch =>
  dispatch({ type: CLEAR_A_HOLLER });

export const postCommentAction = (hollerID, body) => dispatch => {
  dispatch({ type: COMMENT_LOADING });
  axios
    .post(`/holler/${hollerID}/comment`, body)
    .then(res => {
      dispatch({ type: POST_COMMENT, payload: res.data });
      dispatch({ type: COMMENT_LOADED });
    })
    .catch(err => {
      dispatch({ type: COMMENT_LOADED });
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserDataAction = userName => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userName}`)
    .then(res => {
      dispatch({ type: GET_HOLLERS, payload: res.data.hollers });
      dispatch({ type: GET_USER_DATA, payload: res.data.user });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: LOADED_DATA });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      dispatch({ type: LOADED_DATA });
    });
};
