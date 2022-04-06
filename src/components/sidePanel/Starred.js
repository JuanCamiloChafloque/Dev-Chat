import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import {
  getStarredChannels,
  getCurrentChannel,
} from "../../actions/channelActions";

const Starred = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const starChannel = useSelector((state) => state.starChannel);
  const { success } = starChannel;

  const unstarChannel = useSelector((state) => state.unstarChannel);
  const { success: removed } = unstarChannel;

  const getStarred = useSelector((state) => state.getStarred);
  const { starred } = getStarred;

  const currentChannel = useSelector((state) => state.currentChannel);
  const { channel } = currentChannel;

  useEffect(() => {
    if (userInfo) {
      dispatch(getStarredChannels(userInfo.uid));
    }
  }, [dispatch, success, removed, userInfo]);

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
