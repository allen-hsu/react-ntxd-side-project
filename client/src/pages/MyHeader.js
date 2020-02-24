import React from "react";
import { Menu, Dropdown, Button, Icon, PageHeader } from "antd";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  margin: 0 8px 8px 0;
`;

class MyHeader extends React.Component {
  render() {
    return (
      <PageHeader title="Title" subTitle="This is a subtitle"></PageHeader>
    );
  }
}

export default MyHeader;
