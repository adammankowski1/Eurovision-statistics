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
        render: (text, record, index) => <div>{index + 1 + "."} <a href={"https://www.youtube.com/watch?v=" + record.id}>{text}</a></div>
      }, {
        title: 'Views',
        dataIndex: 'views',
        key: 'views',
        sorter: (a, b) => a.views - b.views,
        defaultSortOrder: 'descend'
      }, {
        title: 'Likes',
        dataIndex: 'likes',
        key: 'likes',
        sorter: (a, b) => a.likes - b.likes,
      }, {
        title: 'Dislikes',
        dataIndex: 'dislikes',
        key: 'dislikes',
        sorter: (a, b) => a.dislikes - b.dislikes,
      }, {
        title: 'Likes to dislikes ratio',
        render: (text, record) => { return (record.likes / record.dislikes).toFixed(2); }
      }, {
        title: 'Comments',
        dataIndex: 'comments',
        key: 'comments',
        sorter: (a, b) => a.comments - b.comments,
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
        <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={false}/>
      </div>
    )
  }
};