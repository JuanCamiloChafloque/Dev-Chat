import React, { useState, useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import Skeleton from "./Skeleton";

const MessagePanel = ({
  userInfo,
  channel,
  isPrivate,
  messages,
  loadingMessages,
  successFavorite,
  successUnfavorite,
}) => {
  const [search, setSearch] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [messagesEnd, setMessagesEnd] = useState();

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

  useEffect(() => {
    const scrollDown = () => {
      if (messagesEnd) {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollDown();
  }, [messages, messagesEnd]);

  const displayMessages = (msg) => {
    if (userInfo && msg && msg.length > 0) {
      return msg.map((message) => (
        <Message
          key={message.timestamp}
          message={message}
          user={userInfo}
          loading={loadingMessages}
        />
      ));
    }
  };

  return (
    <>
      <MessagesHeader
        channel={channel && channel}
        isPrivate={isPrivate}
        messages={messages && messages}
        filter={filterSearchHandler}
        loggedInUser={userInfo && userInfo}
        successFavorite={successFavorite}
        successUnfavorite={successUnfavorite}
        loadingMessages={loadingMessages}
      />
      <Segment>
        <Comment.Group className="messages">
          {loadingMessages ? (
            <React.Fragment>
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </React.Fragment>
          ) : null}
          {search
            ? displayMessages(filteredResults)
            : displayMessages(messages)}
          <div ref={(node) => setMessagesEnd(node)}></div>
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
