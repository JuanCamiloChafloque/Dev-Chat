import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
} from "../constants/messageConstants";

export const messageCreateReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
