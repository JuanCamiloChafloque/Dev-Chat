import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = ({ modal, closeModal }) => {
  const [file, setFile] = useState(null);

  const sendFileHandler = () => {
    if (file && isAuthorized()) {
      const metadata = {
        contentType: file.type,
      };
      //DISPATCH
      setFile(null);
      closeModal();
    }
  };

  const isAuthorized = () => {
    const inputs = ["image/jpeg", "image/png", "image/jpg"];
    if (inputs.includes(file.type)) {
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
          label="File types: jpg, jpeg, png"
          name="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
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
