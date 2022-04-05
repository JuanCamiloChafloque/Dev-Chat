import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGES_FROM_CHANNEL_CLEAR,
  GET_MESSAGES_FROM_CHANNEL_REQUEST,
  GET_MESSAGES_FROM_CHANNEL_SUCCESS,
  GET_MESSAGES_FROM_CHANNEL_FAIL,
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

export const getChannelMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGES_FROM_CHANNEL_REQUEST:
      return {
        loading: true,
      };
    case GET_MESSAGES_FROM_CHANNEL_SUCCESS:
      return {
        loading: false,
        messages: action.payload,
      };
    case GET_MESSAGES_FROM_CHANNEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_MESSAGES_FROM_CHANNEL_CLEAR:
      return {
        messages: [],
      };
    default:
      return state;
  }
};
