import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
//import Home from './pages/Home';
import List from './pages/List';
import Servdetail from './pages/Servdetail';
class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={List}/>
          <Route path='/:id' component={Servdetail}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
