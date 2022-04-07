import md5 from "md5";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  GET_USERS_CLEAR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  USER_COLORS_REQUEST,
  USER_COLORS_SUCCESS,
  USER_COLORS_FAIL,
  USER_GET_COLORS_REQUEST,
  USER_GET_COLORS_SUCCESS,
  USER_GET_COLORS_FAIL,
  SET_COLORS,
} from "../constants/userConstants";
import {
  GET_CHANNELS_CLEAR,
  GET_CURRENT_CHANNEL_CLEAR,
} from "../constants/channelConstants";
import { GET_MESSAGES_FROM_CHANNEL_CLEAR } from "../constants/messageConstants";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, child, get, push } from "firebase/database";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const db = getDatabase();
    await set(ref(db, "users/" + user.uid), {
      name: user.displayName,
      avatar: user.photoURL,
      status: "online",
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    });

    localStorage.setItem("userInfo", JSON.stringify(user));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.code,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: username,
      photoURL:
        "http://gravatar.com/avatar/" + md5(user.email) + "?d=identicon",
    });
    saveUser(user);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: user,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    });

    localStorage.setItem("userInfo", JSON.stringify(user));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.code,
    });
  }
};

export const getAllUsers = (loggedInId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERS_REQUEST,
    });

    let all = [];
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, "users/"));
    if (snapshot.exists()) {
      all = Object.keys(snapshot.val()).map((key) => {
        return {
          ...snapshot.val()[key],
          uid: key,
        };
      });
    }

    const users = all.filter((x) => x.uid !== loggedInId);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: users,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.code,
    });
  }
};

export const setAppColors =
  (userId, primary, secondary) => async (dispatch) => {
    try {
      dispatch({
        type: USER_COLORS_REQUEST,
      });

      const db = getDatabase();
      const key = push(child(ref(db), "colors")).key;

      const colors = {
        id: key,
        primary,
        secondary,
      };

      await set(ref(db, "colors/" + userId + "/" + key), colors);

      dispatch({
        type: USER_COLORS_SUCCESS,
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: USER_COLORS_FAIL,
        payload: err.code,
      });
    }
  };

export const getUserColors = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_COLORS_REQUEST,
    });

    let colors = [];
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, "colors/" + userId));
    if (snapshot.exists()) {
      colors = Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
    }

    dispatch({
      type: USER_GET_COLORS_SUCCESS,
      payload: colors,
    });
  } catch (err) {
    dispatch({
      type: USER_GET_COLORS_FAIL,
      payload: err.code,
    });
  }
};

export const setColors = (primary, secondary) => async (dispatch) => {
  dispatch({
    type: SET_COLORS,
    payload: {
      primary,
      secondary,
    },
  });
};

export const logout = (user) => async (dispatch) => {
  const auth = getAuth();
  const db = getDatabase();
  await set(ref(db, "users/" + user.uid), {
    name: user.displayName,
    avatar: user.photoURL,
    status: "offline",
  });
  await signOut(auth);
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: GET_CHANNELS_CLEAR,
  });
  dispatch({
    type: GET_CURRENT_CHANNEL_CLEAR,
  });
  dispatch({
    type: GET_MESSAGES_FROM_CHANNEL_CLEAR,
  });
  dispatch({
    type: GET_USERS_CLEAR,
  });
};

const saveUser = (user) => {
  const db = getDatabase();
  set(ref(db, "users/" + user.uid), {
    name: user.displayName,
    avatar: user.photoURL,
  });
};
