import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import StartPage from './routes/StartPage';
import GamePage from './routes/GamePage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/session/:sessionId" component={GamePage}/>
      </Switch>
     
    </Router>
  );
}

export default RouterConfig;
