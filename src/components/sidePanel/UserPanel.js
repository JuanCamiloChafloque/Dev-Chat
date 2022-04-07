import React from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

const UserPanel = ({ userInfo }) => {
  const dispatch = useDispatch();

  const dropdownOptions = () => [
    {
      key: "User",
      text: (
        <span>
          Signed in as <strong>{userInfo && userInfo.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "Avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "Logout",
      text: <span onClick={logoutHandler}>Logout</span>,
    },
  ];

  const logoutHandler = () => {
    dispatch(logout(userInfo));
  };

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code"></Icon>
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown
            trigger={
              <span>
                <Image
                  src={userInfo && userInfo.photoURL}
                  spaced="right"
                  avatar
                />
                {userInfo && userInfo.displayName}
              </span>
            }
            options={dropdownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
