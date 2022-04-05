import React, { useState, useEffect } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessagesHeader = ({ channel, messages }) => {
  const [users, setUsers] = useState(0);

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
    countUsers();
  }, [messages]);

  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channel ? "#" + channel.name : ""}
          <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>{users} users</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
