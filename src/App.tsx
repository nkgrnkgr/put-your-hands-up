import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'css/font.css';
import 'css/animation.css';
import 'css/tab.css';
import 'css/color.css';
import FloatButton from 'containers/FloatButton';
import OrganizerPage from 'containers/Organizer/OrganizerPage';
import List from 'containers/Organizer/List';
import Edit from 'containers/Organizer/Edit';
import Create from 'containers/Organizer/Create';
import Home from 'components/Home';
import EventWrapper from 'containers/Event/EventWrapper';

const app: React.SFC = () => (
  <>
    <Switch>
      <Route exact={true} path={'/'} component={Home} />
      <Route
        path={'/organizer'}
        render={props => (
          <section className="section">
            <OrganizerPage>
              <Route exact={true} path={'/organizer'} component={List} />
              <Route {...props} path={'/organizer/edit/:id'} component={Edit} />
              <Route {...props} path={'/organizer/create'} component={Create} />
            </OrganizerPage>
          </section>
        )}
      />
      <Route
        path={'/events/:eventurl'}
        render={props => (
          <>
            <EventWrapper {...props} />
            <div
              className="container is-flex-mobile"
              style={{ display: 'none' }}
            >
              <FloatButton />
            </div>
          </>
        )}
      />
    </Switch>
  </>
);

export default app;
