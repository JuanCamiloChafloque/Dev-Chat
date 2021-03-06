import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import Spinner from "../utils/Spinner";

const Message = ({ message, user, loading }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Comment>
          <Comment.Avatar src={message.user.avatar} />
          <Comment.Content
            className={message.user.id === user.uid ? "message__self" : ""}
          >
            <Comment.Author as="a">{message.user.name}</Comment.Author>
            <Comment.Metadata>
              {moment(message.timestamp).fromNow()}
            </Comment.Metadata>
            <Comment.Text>{message.content && message.content}</Comment.Text>
            {message.image && (
              <Image src={message.image} className="message__image" />
            )}
          </Comment.Content>
        </Comment>
      )}
    </>
  );
};

export default Message;
