import React from 'react';
import LiveStatistics from '../liveStatistics/index';
import { Switch, Route } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LiveStatistics}/>
        <Route path='/daily' component={LiveStatistics}/>
      </Switch>)
  }
}
