import axios from 'axios';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  UI_LOADING,
  SET_UNAUTH,
  LOADING_USER,
  MARK_NOTIF_READ
} from '../constants/ActionsTypes';

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then(res => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const uploadPhotoProfile = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => dispatch(getUserData()))
    .catch(err => console.log(err));
};

export const setAuthUserAction = (userData, history, authType) => dispatch => {
  dispatch({ type: UI_LOADING });
  axios
    .post(`/${authType}`, userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken', FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signOutUserAction = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTH });
};

export const editUserProfile = userProfile => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userProfile)
    .then(() => dispatch(getUserData()))
    .catch(err => console.log(err));
};

export const markNotifReadActions = notifID => dispatch => {
  axios
    .post('/notifications', notifID)
    .then(res => {
      dispatch({ type: MARK_NOTIF_READ });
    })
    .catch(err => console.error(err));
};
