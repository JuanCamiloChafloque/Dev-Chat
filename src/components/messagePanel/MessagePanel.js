import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import { getChannelMessages } from "../../actions/messageActions";

const MessagePanel = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentChannel = useSelector((state) => state.currentChannel);
  const { channel, isPrivate } = currentChannel;

  const channelMessages = useSelector((state) => state.channelMessages);
  const { loading, messages } = channelMessages;

  const messageCreate = useSelector((state) => state.messageCreate);
  const { success } = messageCreate;

  const filterSearchHandler = (e) => {
    setSearch(e.target.value);
    const filteredMessages = [...messages];
    const regex = new RegExp(search, "gi");
    const searchResults = filteredMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    setFilteredResults(searchResults);
  };

  const displayMessages = (msg) => {
    if (userInfo && msg && msg.length > 0) {
      return msg.map((message) => (
        <Message
          key={message.timestamp}
          message={message}
          user={userInfo}
          loading={loading}
        />
      ));
    }
  };

  useEffect(() => {
    if (channel) {
      dispatch(getChannelMessages(channel.id));
    }
  }, [channel, dispatch, success]);

  return (
    <>
      <MessagesHeader
        channel={channel && channel}
        isPrivate={isPrivate}
        messages={messages && messages}
        filter={filterSearchHandler}
        loggedInUser={userInfo && userInfo}
      />
      <Segment>
        <Comment.Group className="messages">
          {search
            ? displayMessages(filteredResults)
            : displayMessages(messages)}
        </Comment.Group>
      </Segment>
      <MessageForm
        channel={channel && channel}
        userInfo={userInfo && userInfo}
      />
    </>
  );
};

export default MessagePanel;
