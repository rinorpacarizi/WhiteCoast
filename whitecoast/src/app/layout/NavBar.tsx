import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import {NavLink} from 'react-router-dom';

export default function NavBar() {
  return (
    <Menu inverted vertical fixed="left" style={{ width: "7rem" }}>
        <Menu.Item style={{ display: "flex" }}>
          <Icon size="big" name="bars" />
        </Menu.Item>
      <Container style={{ marginTop: "10rem" }}>
        <Menu.Item as={NavLink} to='/' style={{ display: "flex" }}>
          <Icon size="big" name="home" />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/bus' style={{ display: "flex" }}>
          <Icon size="big" name="bus" />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/team' style={{ display: "flex" }}>
          <Icon size="big" name="soccer" />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/food' style={{ display: "flex" }}>
          <Icon size="big" name="food" />
        </Menu.Item>
        <Menu.Item style={{ display: "flex" }}>
          <Icon size="big" name="users" />
        </Menu.Item>
      </Container>
      <Container style={{ marginTop: "13rem" }}>
        <Menu.Item style={{ display: "flex" }}>
          <Icon size="big" name="bell" />
        </Menu.Item>
        <Menu.Item style={{ display: "flex" }}>
          <Icon size="big" name="setting" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
