import React, { useState, useEffect } from "react";
import { Icon, Menu, Modal, Form, Input, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  createChannel,
  getAllChannels,
  getCurrentChannel,
} from "../../actions/channelActions";

const Channels = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const channelCreate = useSelector((state) => state.channelCreate);
  const { success } = channelCreate;

  const getChannels = useSelector((state) => state.getChannels);
  const { channels } = getChannels;

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch, success]);

  const currentChannelHandler = (id) => {
    dispatch(getCurrentChannel(id));
  };

  const createChannelHandler = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      dispatch(
        createChannel(
          channelName,
          channelDetails,
          userInfo.displayName,
          userInfo.photoURL
        )
      );
      setModal(false);
    }
  };

  const formIsValid = () => {
    return channelName.length && channelDetails.length;
  };

  return (
    <>
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={() => setModal(true)} />
        </Menu.Item>
        {channels.length > 0 &&
          channels.map((channel) => (
            <Menu.Item
              key={channel.id}
              onClick={() => currentChannelHandler(channel.id)}
              name={channel.name}
              style={{ opacity: 0.7 }}
            >
              # {channel.name}
            </Menu.Item>
          ))}
      </Menu.Menu>

      <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={createChannelHandler}>
            <Form.Field>
              <Input
                fluid
                label="Name of channel"
                name="channelName"
                onChange={(e) => setChannelName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the channel"
                name="channelDetails"
                onChange={(e) => setChannelDetails(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={createChannelHandler}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={() => setModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Channels;
