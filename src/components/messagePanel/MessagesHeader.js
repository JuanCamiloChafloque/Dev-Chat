import React, { useState, useEffect } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessagesHeader = ({
  channel,
  isPrivate,
  messages,
  filter,
  loggedInUser,
}) => {
  const [users, setUsers] = useState(0);
  const [myName, setMyName] = useState("");

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

    setName();
    countUsers();
  }, [messages, isPrivate, channel, loggedInUser]);

  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channel && isPrivate ? "@" : "#"}
          {channel && isPrivate && myName}
          {channel && !isPrivate && channel.name}
          {!isPrivate && <Icon name={"star outline"} color="black" />}
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
  );
};

export default MessagesHeader;
