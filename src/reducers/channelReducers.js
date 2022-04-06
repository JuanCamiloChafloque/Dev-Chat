import {
  CREATE_CHANNEL_FAIL,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  GET_CHANNELS_CLEAR,
  GET_CHANNELS_FAIL,
  GET_CHANNELS_REQUEST,
  GET_CHANNELS_SUCCESS,
  GET_CURRENT_CHANNEL_CLEAR,
  GET_CURRENT_CHANNEL_FAIL,
  GET_CURRENT_CHANNEL_REQUEST,
  GET_CURRENT_CHANNEL_SET_PRIVATE,
  GET_CURRENT_CHANNEL_SET_PUBLIC,
  GET_CURRENT_CHANNEL_SUCCESS,
  GET_STARRED_CHANNELS_CLEAR,
  GET_STARRED_CHANNELS_FAIL,
  GET_STARRED_CHANNELS_REQUEST,
  GET_STARRED_CHANNELS_SUCCESS,
  STAR_CHANNEL_FAIL,
  STAR_CHANNEL_REQUEST,
  STAR_CHANNEL_SUCCESS,
  UNSTAR_CHANNEL_FAIL,
  UNSTAR_CHANNEL_REQUEST,
  UNSTAR_CHANNEL_SUCCESS,
} from "../constants/channelConstants";

export const channelCreateReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_CHANNEL_REQUEST:
      return {
        loading: true,
      };
    case CREATE_CHANNEL_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_CHANNEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const starChannelReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case STAR_CHANNEL_REQUEST:
      return {
        loading: true,
      };
    case STAR_CHANNEL_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case STAR_CHANNEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const unstarChannelReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UNSTAR_CHANNEL_REQUEST:
      return {
        loading: true,
      };
    case UNSTAR_CHANNEL_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case UNSTAR_CHANNEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getChannelsReducer = (state = { channels: [] }, action) => {
  switch (action.type) {
    case GET_CHANNELS_REQUEST:
      return {
        loading: true,
      };
    case GET_CHANNELS_SUCCESS:
      return {
        loading: false,
        channels: action.payload,
      };
    case GET_CHANNELS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_CHANNELS_CLEAR:
      return {
        channels: [],
      };
    default:
      return state;
  }
};

export const getStarredChannelsReducer = (state = { starred: [] }, action) => {
  switch (action.type) {
    case GET_STARRED_CHANNELS_REQUEST:
      return {
        loading: true,
      };
    case GET_STARRED_CHANNELS_SUCCESS:
      return {
        loading: false,
        starred: action.payload,
      };
    case GET_STARRED_CHANNELS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_STARRED_CHANNELS_CLEAR:
      return {
        starred: [],
      };
    default:
      return state;
  }
};

export const getCurrentChannelReducer = (
  state = { channel: null, isPrivate: false },
  action
) => {
  switch (action.type) {
    case GET_CURRENT_CHANNEL_REQUEST:
      return {
        loading: true,
      };
    case GET_CURRENT_CHANNEL_SUCCESS:
      return {
        loading: false,
        channel: action.payload,
      };
    case GET_CURRENT_CHANNEL_SET_PRIVATE:
      return {
        ...state,
        isPrivate: true,
      };
    case GET_CURRENT_CHANNEL_SET_PUBLIC:
      return {
        ...state,
        isPrivate: false,
      };
    case GET_CURRENT_CHANNEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_CURRENT_CHANNEL_CLEAR:
      return {
        channel: null,
      };
    default:
      return state;
  }
};
