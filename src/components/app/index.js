import React from 'react';
import Header from '../header/index';
import Main from '../main/index';

export default class App extends React.Component {
  render() {
    return (<div>
        <Header />
        <Main />
      </div>
    );
  }
}
