import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'css/font.css';
import 'css/animation.css';
import CommentsBoard from 'containers/Event/CommentsBoard';
import Navbar from 'containers/Navbar';
import Login from 'containers/Login';
import FloatBotton from 'containers/FloatBotton';
import OrganizerPage from 'containers/Organizer/OrganizerPage';
import List from 'containers/Organizer/List';
import Edit from 'containers/Organizer/Edit';
import Create from 'containers/Organizer/Create';
import Home from 'components/Home';
import EventInfo from 'containers/Event/EventInfo';
import Tabs from 'components/Event/Tabs';
import EventWrapper from 'containers/Event/EventWrapper';

const app: React.SFC = () => (
  <>
    <Switch>
      <Route exact={true} path={'/'} component={Home} />
      <Route path={'/login'} render={props => <Login />} />
      <Route
        path={'/organizer'}
        render={props => (
          <OrganizerPage>
            <Route exact={true} path={'/organizer'} component={List} />
            <Route {...props} path={'/organizer/edit/:id'} component={Edit} />
            <Route {...props} path={'/organizer/create'} component={Create} />
          </OrganizerPage>
        )}
      />
      <Route
        path={'/events/:eventurl'}
        render={props => (
          <section className="section">
            <Navbar />
            <div className="container">
              <EventWrapper {...props}>
                <EventInfo {...props} />
                <Tabs {...props} />
                <CommentsBoard {...props} />
              </EventWrapper>
            </div>
            <div
              className="container is-flex-mobile"
              style={{ display: 'none' }}
            >
              <FloatBotton />
            </div>
          </section>
        )}
      />
    </Switch>
  </>
);

export default app;
