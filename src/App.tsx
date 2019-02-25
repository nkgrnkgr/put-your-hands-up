import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';
import 'bulma-pageloader/dist/css/bulma-pageloader.min.css';
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
import Footer from 'components/Footer';
import EventWrapper from 'containers/Event/EventWrapper';
import AuthWrapper from 'containers/AuthWrapper';
import Base from 'containers/UserSetting/Base';
import Navbar from 'containers/Navbar';
import LoginRequired from 'containers/LoginRequired';

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
              <AuthWrapper>
                <FloatButton />
              </AuthWrapper>
            </div>
          </>
        )}
      />
      <Route
        path={'/setting'}
        render={props => (
          <>
            <Navbar isShownSignInButtons={false} hasTabs={false} />
            <div style={{ height: '50px' }} />
            <AuthWrapper>
              <section className="section">
                <Base {...props} />
              </section>
            </AuthWrapper>
            <AuthWrapper isAuthenComponent={false}>
              <section className="section">
                <div className="container">
                  <LoginRequired />
                </div>
              </section>
              <div style={{ height: '300px' }}>{''}</div>
            </AuthWrapper>
          </>
        )}
      />
    </Switch>
    <Footer />
  </>
);

export default app;
