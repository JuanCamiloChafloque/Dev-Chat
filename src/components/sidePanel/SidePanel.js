import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

const SidePanel = ({
  userInfo,
  starred,
  channel,
  loadingChannels,
  channels,
  users,
}) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      className="sidepanel__menu"
    >
      <UserPanel userInfo={userInfo} />
      <Starred starred={starred} channel={channel} />
      <Channels
        userInfo={userInfo}
        loadingChannels={loadingChannels}
        channels={channels}
        channel={channel}
      />
      <DirectMessages userInfo={userInfo} users={users} />
    </Menu>
  );
};

export default SidePanel;
