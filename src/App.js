import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'assets/css/font.css';

import CodeHome from 'pages/home/CodeHome';
import CodeLogin from 'pages/login/CodeLogin';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={ CodeLogin } />
                    <Route path="/" component={ CodeHome } />
                </Switch>
            </Router>
        );
    }
}

export default App;