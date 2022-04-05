import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
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
