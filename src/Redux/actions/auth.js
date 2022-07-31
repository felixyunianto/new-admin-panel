import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import { signInServices, signOutServices } from "../../Services/";

export const signIn = (username, password) => (dispatch) => {
  return signInServices(username, password).then(
    (data) => {
      console.log(data.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.error ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject(message);
    }
  );
};

export const signOut = () => (dispatch) => {
  return signOutServices().then(
    (data) => {
      dispatch({
        type: LOGOUT,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.error ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const changeProfileRedux = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user: data,
    },
  });
};
