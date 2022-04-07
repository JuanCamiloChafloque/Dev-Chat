import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.css";

import ColorPanel from "./components/colorPanel/ColorPanel";
import SidePanel from "./components/sidePanel/SidePanel";
import MessagePanel from "./components/messagePanel/MessagePanel";
import MetaPanel from "./components/metaPanel/MetaPanel";

import { getStarredChannels, getAllChannels } from "./actions/channelActions";
import { getChannelMessages } from "./actions/messageActions";
import { getAllUsers, getUserColors } from "./actions/userActions";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentChannel = useSelector((state) => state.currentChannel);
  const { channel, isPrivate } = currentChannel;

  const starChannel = useSelector((state) => state.starChannel);
  const { success: successFavorite } = starChannel;

  const unstarChannel = useSelector((state) => state.unstarChannel);
  const { success: successUnfavorite } = unstarChannel;

  const getStarred = useSelector((state) => state.getStarred);
  const { starred } = getStarred;

  const channelCreate = useSelector((state) => state.channelCreate);
  const { success: successCreate } = channelCreate;

  const messageCreate = useSelector((state) => state.messageCreate);
  const { success: successMessage } = messageCreate;

  const userColors = useSelector((state) => state.userColors);
  const { success: successColors } = userColors;

  const getChannels = useSelector((state) => state.getChannels);
  const { loading: loadingChannels, channels } = getChannels;

  const getUsers = useSelector((state) => state.getUsers);
  const { users } = getUsers;

  const getColors = useSelector((state) => state.getColors);
  const { colors } = getColors;

  const color = useSelector((state) => state.color);
  const { color: appColors } = color;

  const channelMessages = useSelector((state) => state.channelMessages);
  const { loading: loadingMessages, messages } = channelMessages;

  useEffect(() => {
    if (userInfo) {
      dispatch(getStarredChannels(userInfo.uid));
    }
  }, [dispatch, userInfo, successFavorite, successUnfavorite]);

  useEffect(() => {
    if (channel) {
      dispatch(getChannelMessages(channel.id));
    }
  }, [channel, dispatch, successMessage]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserColors(userInfo.uid));
    }
  }, [userInfo, dispatch, successColors]);

  //TODO: Puede que el channel dependa
  useEffect(() => {
    if (userInfo) {
      dispatch(getAllUsers(userInfo.uid));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <Grid
      columns="equal"
      className="app"
      style={{ background: appColors ? appColors.secondary : "#eee" }}
    >
      <ColorPanel
        key={channel && channel.id}
        userInfo={userInfo}
        colors={colors}
      />
      <SidePanel
        key={userInfo && userInfo.uid}
        userInfo={userInfo}
        starred={starred}
        channel={channel}
        channels={channels}
        loadingChannels={loadingChannels}
        users={users}
        color={appColors}
      />
      <Grid.Column style={{ marginLeft: 320 }}>
        <MessagePanel
          key={userInfo && userInfo.displayName}
          userInfo={userInfo}
          channel={channel}
          isPrivate={isPrivate}
          messages={messages}
          loadingMessages={loadingMessages}
          successFavorite={successFavorite}
          successUnfavorite={successUnfavorite}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        {/* TODO: Revisar porque da error cuando accedo a un canal privado */}
        <MetaPanel
          key={channel && channel.name}
          messages={messages}
          isPrivate={isPrivate}
          channel={channel}
        />
      </Grid.Column>
    </Grid>
  );
};

export default App;
