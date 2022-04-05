import React from "react";
import { useSelector } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessagesHeader = () => {
  const currentChannel = useSelector((state) => state.currentChannel);
  const { channel } = currentChannel;

  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {channel ? channel.name : ""}
          <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>2 users</Header.Subheader>
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
