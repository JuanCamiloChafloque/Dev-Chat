import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Segment, Button, Input } from "semantic-ui-react";
import { createMessage } from "../../actions/messageActions";
import { Picker, emojiIndex } from "emoji-mart";
import FileModal from "./FileModal";
import "emoji-mart/css/emoji-mart.css";

const MessageForm = ({ channel, userInfo }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);

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

  const togglePickerHandler = () => {
    setEmojiPicker((prev) => !prev);
  };

  const emojiHandler = (emoji) => {
    const oldMessage = message;
    const newMessage = colonToUnicode(` ${oldMessage} ${emoji.colons} `);
    setMessage(newMessage);
    setEmojiPicker(false);
  };

  const colonToUnicode = (message) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  return (
    <Segment className="message__form">
      {emojiPicker && (
        <Picker
          set="apple"
          className="emojipicker"
          title="Pick your emoji"
          emoji="point_up"
          onSelect={emojiHandler}
        />
      )}
      <Input
        fluid
        name="message"
        value={message}
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} onClick={togglePickerHandler} />}
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
