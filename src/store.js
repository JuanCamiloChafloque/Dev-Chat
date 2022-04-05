import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//User Reducers
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  channelCreateReducer,
  getChannelsReducer,
  getCurrentChannelReducer,
} from "./reducers/channelReducers";
import { messageCreateReducer } from "./reducers/messageReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  channelCreate: channelCreateReducer,
  getChannels: getChannelsReducer,
  currentChannel: getCurrentChannelReducer,
  messageCreate: messageCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
