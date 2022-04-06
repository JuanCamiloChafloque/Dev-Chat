import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import { getAllUsers } from "../../actions/userActions";

const DirectMessages = () => {
  const dispatch = useDispatch();

  const getUsers = useSelector((state) => state.getUsers);
  const { users } = getUsers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getAllUsers(userInfo && userInfo.uid));
  }, [dispatch, userInfo]);

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> DIRECT MESSAGES
        </span>{" "}
        ({users && users.length}){" "}
      </Menu.Item>
      {users &&
        users.map((user) => (
          <Menu.Item
            key={user.uid}
            style={{ opacity: 0.7, fontStyle: "italic" }}
            onClick={() => console.log(user)}
          >
            <Icon
              name="circle"
              color={user.status === "online" ? "green" : "red"}
            />
            @ {user.name}
          </Menu.Item>
        ))}
    </Menu.Menu>
  );
};

export default DirectMessages;
