import {
  CREATE_CHANNEL_FAIL,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  GET_CHANNELS_FAIL,
  GET_CHANNELS_REQUEST,
  GET_CHANNELS_SUCCESS,
  GET_CURRENT_CHANNEL_FAIL,
  GET_CURRENT_CHANNEL_REQUEST,
  GET_CURRENT_CHANNEL_SUCCESS,
} from "../constants/channelConstants";
import { getDatabase, ref, set, child, push, onValue } from "firebase/database";

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

export const getAllChannels = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHANNELS_REQUEST,
    });

    let channels = [];
    const db = getDatabase();
    const channelRef = ref(db, "channels");
    onValue(channelRef, (snapshot) => {
      channels = Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
    });

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

export const getCurrentChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CURRENT_CHANNEL_REQUEST,
    });

    let channel;
    const db = getDatabase();
    const channelRef = ref(db, "channels/" + id);
    onValue(channelRef, (snapshot) => {
      channel = snapshot.val();
    });

    console.log(channel);

    dispatch({
      type: GET_CURRENT_CHANNEL_SUCCESS,
      payload: channel,
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_CHANNEL_FAIL,
      payload: err.code,
    });
  }
};
