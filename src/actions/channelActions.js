import {
  CREATE_CHANNEL_FAIL,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
} from "../constants/channelConstants";
import { getDatabase, ref, set, child, push } from "firebase/database";

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

export const getChannels = () => async (dispatch) => {};
