import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Chat from "../components/Chat";
const { Header, Content, Footer, Sider } = Layout;
class MyFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        Ntut Ixd ©2019 Created by Allen Hsu
      </Footer>
    );
  }
}

export default MyFooter;
