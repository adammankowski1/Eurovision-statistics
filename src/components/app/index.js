import React from 'react';
import SiteHeader from '../header/index';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Content, Footer } = Layout;
import styles from './index.css';

export default class App extends React.Component {
  render() {
    return ( <div>
      <Layout className="layout" style={{height:"100vh"}}>
      <SiteHeader />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </div>
    );
  }
}
