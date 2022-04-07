import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//User Reducers
import {
  userLoginReducer,
  userRegisterReducer,
  getUsersReducer,
  userAppColorsReducer,
  getColorsReducer,
  setColorReducer,
} from "./reducers/userReducers";
import {
  channelCreateReducer,
  starChannelReducer,
  unstarChannelReducer,
  getChannelsReducer,
  getCurrentChannelReducer,
  getStarredChannelsReducer,
} from "./reducers/channelReducers";
import {
  messageCreateReducer,
  getChannelMessagesReducer,
} from "./reducers/messageReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userColors: userAppColorsReducer,
  getColors: getColorsReducer,
  color: setColorReducer,
  channelCreate: channelCreateReducer,
  starChannel: starChannelReducer,
  unstarChannel: unstarChannelReducer,
  getChannels: getChannelsReducer,
  getStarred: getStarredChannelsReducer,
  currentChannel: getCurrentChannelReducer,
  messageCreate: messageCreateReducer,
  channelMessages: getChannelMessagesReducer,
  getUsers: getUsersReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  color: { primary: "#4c3c4c", secondary: "#eee" },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
