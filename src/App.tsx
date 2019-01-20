import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'css/animation.css';
import CommentsBoard from 'containers/CommentsBoard';
import Navbar from 'containers/Navbar';
import Login from 'containers/Login';
import FloatBotton from 'containers/FloatBotton';
import OrganizerPage from 'containers/Organizer/OrganizerPage';
import List from 'containers/Organizer/List';
import Edit from 'containers/Organizer/Edit';

const app: React.SFC = () => (
  <>
    <Switch>
      <Route path={'/login'} render={props => <Login />} />
      <Route
        path={'/organizer'}
        render={props => (
          <OrganizerPage>
            <Route exact={true} path={'/organizer'} component={List} />
            <Route {...props} path={'/organizer/edit/:id'} component={Edit} />
            <Route
              {...props}
              path={'/organizer/create'}
              render={props => <div>create</div>}
            />
          </OrganizerPage>
        )}
      />
      <Route
        path={'/'}
        render={props => (
          <section className="section">
            <Navbar />
            <div className="container">
              <CommentsBoard />
            </div>
            <div
              className="container is-flex-mobile"
              style={{ display: 'none' }}
            >
              <FloatBotton />
            </div>

            {/* <div className="container">
              <nav className="navbar is-fixed-bottom">
                <div className="container">aaa</div>
              </nav>
            </div> */}
          </section>
        )}
      />
      {/* <Auth>
      </Auth> */}
    </Switch>
  </>
);

export default app;
