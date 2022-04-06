import {
  CREATE_CHANNEL_FAIL,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  GET_CHANNELS_FAIL,
  GET_CHANNELS_REQUEST,
  GET_CHANNELS_SUCCESS,
  GET_CURRENT_CHANNEL_FAIL,
  GET_CURRENT_CHANNEL_REQUEST,
  GET_CURRENT_CHANNEL_SET_PRIVATE,
  GET_CURRENT_CHANNEL_SET_PUBLIC,
  GET_CURRENT_CHANNEL_SUCCESS,
} from "../constants/channelConstants";
import { getDatabase, ref, set, child, push, get } from "firebase/database";

export const createChannel =
  (name, details, username, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CHANNEL_REQUEST,
      });

      const db = getDatabase();
      const key = push(child(ref(db), "channels")).key;

      const newChannel = {
        id: key,
        name: name,
        details: details,
        createdBy: {
          name: username,
          avatar: avatar,
        },
      };

      await set(ref(db, "channels/" + key), newChannel);

      dispatch({
        type: CREATE_CHANNEL_SUCCESS,
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: CREATE_CHANNEL_FAIL,
        payload: err.code,
      });
    }
  };

export const createPrivateChannel = (id, user1, user2) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CHANNEL_REQUEST,
    });

    const db = getDatabase();

    const newChannel = {
      id,
      user1,
      user2,
    };
    console.log(newChannel);

    await set(ref(db, "private-channels/" + id), newChannel);

    dispatch({
      type: CREATE_CHANNEL_SUCCESS,
      payload: true,
    });
  } catch (err) {
    dispatch({
      type: CREATE_CHANNEL_FAIL,
      payload: err.code,
    });
  }
};

export const getAllChannels = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHANNELS_REQUEST,
    });

    let channels = [];
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, "channels/"));
    if (snapshot.exists()) {
      channels = Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
    }

    dispatch({
      type: GET_CHANNELS_SUCCESS,
      payload: channels,
    });
  } catch (err) {
    dispatch({
      type: GET_CHANNELS_FAIL,
      payload: err.code,
    });
  }
};

export const getCurrentChannel =
  (id, isPrivate = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CURRENT_CHANNEL_REQUEST,
      });

      let channel;
      if (isPrivate) {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "private-channels/" + id));
        if (snapshot.exists()) {
          channel = snapshot.val();
        }
      } else {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, "channels/" + id));
        if (snapshot.exists()) {
          channel = snapshot.val();
        }
      }

      dispatch({
        type: GET_CURRENT_CHANNEL_SUCCESS,
        payload: channel,
      });

      if (isPrivate) {
        dispatch({ type: GET_CURRENT_CHANNEL_SET_PRIVATE });
      } else {
        dispatch({ type: GET_CURRENT_CHANNEL_SET_PUBLIC });
      }
    } catch (err) {
      dispatch({
        type: GET_CURRENT_CHANNEL_FAIL,
        payload: err.code,
      });
    }
  };

export const getCurrentPrivateChannel = (id, name) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CURRENT_CHANNEL_REQUEST,
    });

    const channel = {
      id,
      name,
    };

    dispatch({
      type: GET_CURRENT_CHANNEL_SUCCESS,
      payload: channel,
    });
    dispatch({ type: GET_CURRENT_CHANNEL_SET_PRIVATE });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_CHANNEL_FAIL,
      payload: err.code,
    });
  }
};

export const verifyChannel = async (id) => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, "private-channels/" + id));
  if (!snapshot.val()) {
    return false;
  }
  return true;
};
