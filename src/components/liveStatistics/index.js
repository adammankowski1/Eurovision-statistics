import React from 'react';

class BootstrapTable extends React.Component {
  componentDidMount() {
    //$(ReactDOM.findDOMNode(this)).bootstrapTable(this.props)
  }
  componentWillReceiveProps(nextProps) {
    //$(ReactDOM.findDOMNode(this)).bootstrapTable('refreshOptions', nextProps)
  }
  shouldComponentUpdate() {
    return false
  }
  componentWillUnmount() {
    //$(ReactDOM.findDOMNode(this)).bootstrapTable('destroy')
  }
  render() {
    return (
      <table />
    )
  }
}

export default class LiveStatistics extends React.Component {
  render() {
    return (<div> <BootstrapTable /> </div>
    )
  }
}
