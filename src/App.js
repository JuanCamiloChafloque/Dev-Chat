import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";

import ColorPanel from "./components/colorPanel/ColorPanel";
import SidePanel from "./components/sidePanel/SidePanel";
import MessagePanel from "./components/messagePanel/MessagePanel";
import MetaPanel from "./components/metaPanel/MetaPanel";

const App = () => {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <MessagePanel />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

export default App;
