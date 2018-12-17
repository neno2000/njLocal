import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';
import './styles/bootstrap.css';
//import Home from './pages/Home';
import List from './pages/List';
import Servdetail from './pages/Servdetail';
import RfcDetails from './pages/RfcDetails';
import RfcList from './pages/RfcList';

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={List} />
                    <Route exact path='/jsonrfc' component={RfcList} />
                    <Route path='/jsonrfc/:fm' component={RfcDetails} />
                    <Route path='/:servicedetail' component={Servdetail} />
                </Switch>
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
