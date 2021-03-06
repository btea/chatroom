import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainBox } from './App';
import Main from './components/chat/Main';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <MainBox></MainBox>
            </Route>
            <Route path="/main">
                <Main></Main>
            </Route>
        </Switch>
    </Router>,
    document.getElementById('app')
);
