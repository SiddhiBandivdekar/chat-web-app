import React from "react";
import { Nav } from "rsuite";
import Roomitem from "./Roomitem";

const ChatRoomList = ({ height }) => {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${height}px)` }}
    >
      <Nav.Item>
        <Roomitem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;
