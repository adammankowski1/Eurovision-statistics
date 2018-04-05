import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import SiteHeader from '../header/index';
import DailyStatistics from '../dailyStatistics/index';
import LiveStatistics from '../liveStatistics/index';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Content, Footer } = Layout;
import styles from './index.css';

export default class App extends React.Component {
  render() {
    return ( <div>
      <Router>
        <Layout className="layout" style={{height:"100vh"}}>
          <SiteHeader />
          <Content style={{ padding: '25px 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Route exact path="/" component={LiveStatistics} />
              <Route path="/daily" component={DailyStatistics} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
  </div> );
  }
}
