import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";

const Message = ({ message, user }) => {
  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content
        className={message.user.id === user.uid ? "message__self" : ""}
      >
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>
          {moment(message.timestamp).fromNow()}
        </Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
