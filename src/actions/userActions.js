import md5 from "md5";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import {
  GET_CHANNELS_CLEAR,
  GET_CURRENT_CHANNEL_CLEAR,
} from "../constants/channelConstants";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);

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

export const logout = () => async (dispatch) => {
  const auth = getAuth();
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
};

const saveUser = (user) => {
  const db = getDatabase();
  set(ref(db, "users/" + user.uid), {
    name: user.displayName,
    avatar: user.photoURL,
  });
};
