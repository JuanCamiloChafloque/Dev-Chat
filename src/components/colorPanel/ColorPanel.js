import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SliderPicker } from "react-color";
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";
import { setAppColors, setColors } from "../../actions/userActions";

const ColorPanel = ({ userInfo, colors }) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");

  const setAppColorsHandler = () => {
    if (userInfo && primary && secondary) {
      dispatch(setAppColors(userInfo.uid, primary, secondary));
      setModal(false);
    }
  };

  const changeColorsHandler = (prim, sec) => {
    dispatch(setColors(prim, sec));
  };

  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button
        icon="add"
        size="small"
        color="blue"
        onClick={() => setModal(true)}
      />
      {colors &&
        colors.length > 0 &&
        colors.map((color, i) => (
          <React.Fragment key={i}>
            <Divider />
            <div
              className="color__container"
              onClick={() =>
                changeColorsHandler(color.primary, color.secondary)
              }
            >
              <div
                className="color__square"
                style={{ background: color.primary }}
              >
                <div
                  className="color__overlay"
                  style={{ background: color.secondary }}
                ></div>
              </div>
            </div>
          </React.Fragment>
        ))}
      <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment inverted>
            <Label content="Primary Color" />
            <SliderPicker
              onChange={(color) => setPrimary(color.hex)}
              color={primary}
            />
          </Segment>
          <Segment inverted>
            <Label content="Secondary Color" />
            <SliderPicker
              onChange={(color) => setSecondary(color.hex)}
              color={secondary}
            />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={setAppColorsHandler}>
            <Icon name="checkmark" /> Save Colors
          </Button>
          <Button color="red" inverted onClick={() => setModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Sidebar>
  );
};

export default ColorPanel;
