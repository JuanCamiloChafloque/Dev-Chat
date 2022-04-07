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
  color,
}) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{
        background: color ? color.primary : "#4c3c4c",
        fontSize: "1.2rem",
      }}
      className="sidepanel__menu"
    >
      <UserPanel userInfo={userInfo} color={color} />
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
