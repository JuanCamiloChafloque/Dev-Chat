import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { Modal, Input, Button, Icon } from "semantic-ui-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createMessage } from "../../actions/messageActions";

const FileModal = ({ modal, closeModal, channel, user }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const sendFileHandler = () => {
    if (file && isAuthorized() && channel) {
      const metadata = {
        contentType: file.type,
      };
      saveFileToStorage(metadata);
      setFile(null);
      setError(null);
      closeModal();
    } else {
      if (!channel) {
        setError("No channel selected!");
      }
      if (!file) {
        setError("No file uploaded!");
      }
      if (!isAuthorized()) {
        setError("Invalid type of file!");
      }
    }
  };

  const saveFileToStorage = async (metadata) => {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      "chat/" + channel + "/files/" + uuid() + file.name
    );
    await uploadBytes(storageRef, file, metadata);
    const url = await getDownloadURL(storageRef);
    sendMessage(url);
  };

  const sendMessage = (url) => {
    dispatch(createMessage(channel, "", user, url));
  };

  const isAuthorized = () => {
    const inputs = ["image/jpeg", "image/png", "image/jpg"];
    if (file && inputs.includes(file.type)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label={error ? error : "File types: jpg, jpeg, png"}
          name="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className={error ? "error" : ""}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFileHandler}>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
