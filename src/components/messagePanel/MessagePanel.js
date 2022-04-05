import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import { getChannelMessages } from "../../actions/messageActions";

const MessagePanel = () => {
  const dispatch = useDispatch();

  const currentChannel = useSelector((state) => state.currentChannel);
  const { channel } = currentChannel;

  const channelMessages = useSelector((state) => state.channelMessages);
  const { loading, messages } = channelMessages;

  const messageCreate = useSelector((state) => state.messageCreate);
  const { success } = messageCreate;

  useEffect(() => {
    if (channel) {
      dispatch(getChannelMessages(channel.id));
    }
  }, [channel, dispatch, success]);

  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessageForm />
    </>
  );
};

export default MessagePanel;
