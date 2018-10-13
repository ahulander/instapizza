import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Order from './components/order/order';

export default function App() {
    return (
        <Router>
            <Switch>                
                <Route path="/order" render={ props => <Order {...props}/> } />
                <Route exact render={ props => <Home {...props}/> } />
            </Switch>
        </Router>
    );
}
