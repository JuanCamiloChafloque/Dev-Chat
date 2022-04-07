import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import {
  starAChannel,
  unstarAChannel,
  verifyStarred,
} from "../../actions/channelActions";

const MessagesHeader = ({
  channel,
  isPrivate,
  messages,
  filter,
  loggedInUser,
  successFavorite,
  successUnfavorite,
  loadingMessages,
}) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState(0);
  const [myName, setMyName] = useState("");
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    const countUsers = () => {
      if (messages && messages.length > 0) {
        const num = messages.reduce((acc, message) => {
          if (!acc.includes(message.user.name)) {
            acc.push(message.user.name);
          }
          return acc;
        }, []);
        setUsers(num.length);
      } else {
        setUsers(0);
      }
    };

    const setName = () => {
      if (
        isPrivate &&
        loggedInUser &&
        loggedInUser.displayName === channel.user1
      ) {
        setMyName(channel.user2);
      } else if (
        isPrivate &&
        loggedInUser &&
        loggedInUser.displayName === channel.user2
      ) {
        setMyName(channel.user1);
      }
    };

    const isStarred = async () => {
      if (loggedInUser && channel) {
        const isStarred = await verifyStarred(loggedInUser.uid, channel.id);
        if (isStarred) {
          setIsStarred(true);
        } else {
          setIsStarred(false);
        }
      }
    };

    isStarred();
    setName();
    countUsers();
  }, [
    messages,
    isPrivate,
    channel,
    loggedInUser,
    isStarred,
    successFavorite,
    successUnfavorite,
  ]);

  const starChannelHandler = () => {
    if (loggedInUser && channel) {
      if (isStarred) {
        dispatch(unstarAChannel(loggedInUser.uid, channel.id));
      } else {
        dispatch(starAChannel(loggedInUser.uid, channel));
      }
    }
  };

  return (
    <>
      {loadingMessages ? null : (
        <Segment clearing>
          <Header
            fluid="true"
            as="h2"
            floated="left"
            style={{ marginBottom: 0 }}
          >
            <span>
              {channel && isPrivate ? "@" : "#"}
              {channel && isPrivate && myName}
              {channel && !isPrivate && channel.name}
              {!isPrivate && (
                <Icon
                  name={isStarred ? "star" : "star outline"}
                  color={isStarred ? "yellow" : "black"}
                  onClick={starChannelHandler}
                />
              )}
            </span>
            <Header.Subheader>{users} users</Header.Subheader>
          </Header>
          <Header floated="right">
            <Input
              size="mini"
              icon="search"
              name="searchTerm"
              placeholder="Search Messages"
              onChange={filter}
            />
          </Header>
        </Segment>
      )}
    </>
  );
};

export default MessagesHeader;
