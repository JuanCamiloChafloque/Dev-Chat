import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import { getCurrentChannel } from "../../actions/channelActions";

const Starred = ({ starred, channel }) => {
  const dispatch = useDispatch();

  const currentChannelHandler = (id) => {
    dispatch(getCurrentChannel(id));
  };

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="star" /> STARRED
        </span>{" "}
        ({starred && starred.length}){" "}
      </Menu.Item>
      {starred &&
        starred.length > 0 &&
        starred.map((chan) => (
          <Menu.Item
            key={chan.id}
            onClick={() => currentChannelHandler(chan.id)}
            name={chan.name}
            style={{ opacity: 0.7 }}
            active={channel && channel.id === chan.id}
          >
            # {chan.name}
          </Menu.Item>
        ))}
    </Menu.Menu>
  );
};

export default Starred;
