import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';

export default class Header extends React.Component {
  render() {
    return (<Navbar>
      <Nav>
        <NavItem eventKey={1} href="/">
          <span className="glyphicon glyphicon-home"></span> Live statistic
        </NavItem>
        <NavItem eventKey={2} href="/roster">
          <span className="glyphicon glyphicon-user"></span> Daily statistics
        </NavItem>
      </Nav>
    </Navbar>);
  }
}
