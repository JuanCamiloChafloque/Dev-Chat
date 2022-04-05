import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGES_FROM_CHANNEL_FAIL,
  GET_MESSAGES_FROM_CHANNEL_REQUEST,
  GET_MESSAGES_FROM_CHANNEL_SUCCESS,
} from "../constants/messageConstants";
import {
  getDatabase,
  ref,
  set,
  child,
  push,
  get,
  serverTimestamp,
} from "firebase/database";

export const createMessage = (channelId, content, user) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MESSAGE_REQUEST,
    });

    const db = getDatabase();
    const key = push(child(ref(db), "messages/" + channelId)).key;

    const newMessage = {
      content: content,
      timestamp: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };

    await set(ref(db, "messages/" + channelId + "/" + key), newMessage);

    dispatch({
      type: CREATE_MESSAGE_SUCCESS,
      payload: true,
    });
  } catch (err) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload: err.code,
    });
  }
};

export const getChannelMessages = (channelId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MESSAGES_FROM_CHANNEL_REQUEST,
    });

    let messages = [];
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, "messages/" + channelId));
    if (snapshot.exists()) {
      messages = Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
    }

    dispatch({
      type: GET_MESSAGES_FROM_CHANNEL_SUCCESS,
      payload: messages,
    });
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_FROM_CHANNEL_FAIL,
      payload: err.code,
    });
  }
};
