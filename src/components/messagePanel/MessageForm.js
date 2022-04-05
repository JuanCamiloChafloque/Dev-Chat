import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Button, Input } from "semantic-ui-react";
import { createMessage } from "../../actions/messageActions";
import FileModal from "./FileModal";

const MessageForm = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentChannel = useSelector((state) => state.currentChannel);
  const { channel } = currentChannel;

  const sendMessageHandler = () => {
    if (channel && userInfo && message) {
      dispatch(createMessage(channel.id, message, userInfo));
      setError(null);
    } else {
      if (!channel) {
        setError("Could not send message. Select a channel");
      }
      if (!message) {
        setError("Could not send message. Message content is empty");
      }
    }
    setMessage("");
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        value={message}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder={error ? error : "Write your message"}
        onChange={(e) => setMessage(e.target.value)}
        className={error ? "error" : ""}
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add reply"
          labelPosition="left"
          icon="edit"
          onClick={sendMessageHandler}
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
          onClick={() => setModal(true)}
        />
        <FileModal
          modal={modal}
          closeModal={() => setModal(false)}
          channel={channel && channel.id}
          user={userInfo && userInfo}
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
