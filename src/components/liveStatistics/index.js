import React from 'react';
import { Table } from 'antd';

export default class LiveStatistics extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      columns: [{
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      }, {
        title: 'Views',
        dataIndex: 'views',
        key: 'views',
        sorter: (a, b) => a.views - b.views,
        sortOrder: 'descend'
      }, {
        title: 'Likes',
        dataIndex: 'likes',
        key: 'likes',
      }, {
        title: 'Dislikes',
        dataIndex: 'dislikes',
        key: 'dislikes',
      }, {
        title: 'Likes to dislikes ration',
        dataIndex: '',
        key: '',
      }, {
        title: 'Comments',
        dataIndex: 'comments',
        key: 'comments',
    }]};
  }

  componentDidMount() {
    fetch("/api")
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({dataSource: data});
    });
  }

  render() {
    return (
      <div>
        <div>Live Statistics</div>
        <Table dataSource={this.state.dataSource} columns={this.state.columns} />
      </div>
    )
  }
};