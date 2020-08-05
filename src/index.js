import React from 'react';
import ReactDOM from 'react-dom';
import { WorkSpaceContext } from './lib/workspace'
import { Token } from './lib/token'
import Layout from './components/Layout'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from './pages/Home';
import Settings from './pages/Settings';
import WorkSpace from './pages/Workspace'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Token>
      <WorkSpaceContext>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/workspace/:workSpaceId" component={WorkSpace} />
          </Switch>
        </Layout>
      </WorkSpaceContext>
    </Token>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
