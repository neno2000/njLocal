import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import './styles/bootstrap.css';
//import Home from './pages/Home';
import List from './pages/List';
import Servdetail from './pages/Servdetail';
import RfcDetails from './pages/RfcDetails';
import RfcList from './pages/RfcList';
import RfcTypes from './pages/RfcTypes';
import configuration from './config';
import config from 'react-global-configuration';


class App extends Component {
    render() {
        config.set(configuration, { freeze: false });
        const App = () => (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={List} />
                        <Route exact path='/jsonrfc' component={RfcList} />
                        <Route path='/jsonrfc/:fm' component={RfcDetails} />
                        <Route path='/jsonrfctypes/:fm' component={RfcTypes} />
                        <Route path='/:servicedetail' component={Servdetail} />
                    </Switch>
                </Router>
            </div>
        );
        return (
            <Switch>
                <App />
            </Switch>
        );
    }
}

export default App;
