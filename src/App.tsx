import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'css/animation.css';
import CommentsBoard from 'containers/CommentsBoard';
import Navbar from 'containers/Navbar';
import Login from 'containers/Login';

const app: React.SFC = () => (
  <>
    <Switch>
      <Route path={'/login'} render={props => <Login />} />
      <Route
        path={'/'}
        render={props => (
          <section className="section">
            <Navbar />
            <div className="container">
              <CommentsBoard />
            </div>
            <div className="container">
              <nav className="navbar is-fixed-bottom">
                <div className="container" />
              </nav>
            </div>
          </section>
        )}
      />
    </Switch>
  </>
);

export default app;
