import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

export default class SiteHeader extends React.Component {
  render() {
    return (
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Live statistic</Menu.Item>
          <Menu.Item key="2">Daily statistics</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

// (<Navbar>
//   <Nav>
//     <NavItem eventKey={1} href="/">
//       <span className="glyphicon glyphicon-home"></span> Live statistic
//     </NavItem>
//     <NavItem eventKey={2} href="/roster">
//       <span className="glyphicon glyphicon-user"></span> Daily statistics
//     </NavItem>
//   </Nav>
// </Navbar>)
