import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_CLEAR,
  USER_COLORS_REQUEST,
  USER_COLORS_SUCCESS,
  USER_COLORS_FAIL,
  USER_GET_COLORS_REQUEST,
  USER_GET_COLORS_SUCCESS,
  USER_GET_COLORS_FAIL,
  SET_COLORS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userAppColorsReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_COLORS_REQUEST:
      return {
        loading: true,
      };
    case USER_COLORS_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_COLORS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getColorsReducer = (state = { colors: [] }, action) => {
  switch (action.type) {
    case USER_GET_COLORS_REQUEST:
      return {
        loading: true,
      };
    case USER_GET_COLORS_SUCCESS:
      return {
        loading: false,
        colors: action.payload,
      };
    case USER_GET_COLORS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const setColorReducer = (state = { color: {} }, action) => {
  switch (action.type) {
    case SET_COLORS:
      return {
        color: action.payload,
      };
    default:
      return state;
  }
};

export const getUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_USERS_CLEAR:
      return {
        users: [],
      };
    default:
      return state;
  }
};
