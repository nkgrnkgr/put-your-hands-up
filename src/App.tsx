import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';
import 'bulma-pageloader/dist/css/bulma-pageloader.min.css';
import 'css/font.css';
import 'css/animation.css';
import 'css/tab.css';
import 'css/color.css';
import 'css/landingpage.css';
import 'css/navbar.css';
import FloatButton from 'containers/FloatButton';
import OrganizerPage from 'containers/Organizer/OrganizerPage';
import List from 'containers/Organizer/List';
import Edit from 'containers/Organizer/Edit';
import EditLt from 'containers/Organizer/EditLt';
import Create from 'containers/Organizer/Create';
import LandingPage from 'components/LandingPage';
import Footer from 'components/Footer';
import EventWrapper from 'containers/Event/EventWrapper';
import AuthWrapper from 'containers/AuthWrapper';
import Base from 'containers/UserSetting/Base';
import Navbar from 'containers/Navbar';
import LoginRequired from 'containers/LoginRequired';
import DashboardPage from 'containers/Dashboard/DashboardPage';
import DashboardBase from 'components/Dashboard/DashboardBase';

const app: React.SFC = () => (
  <>
    <Switch>
      <Route exact={true} path={'/'} component={LandingPage} />
      <Route
        path={'/dashboard'}
        render={props => (
          <section className="section cover">
            <DashboardPage>
              <DashboardBase />
            </DashboardPage>
          </section>
        )}
      />
      <Route
        path={'/organizer'}
        render={props => (
          <section className="section cover">
            <OrganizerPage>
              <Route exact={true} path={'/organizer'} component={List} />
              <Route {...props} path={'/organizer/edit/:id'} component={Edit} />
              <Route {...props} path={'/organizer/create'} component={Create} />
            </OrganizerPage>
          </section>
        )}
      />
      <Route
        path={'/editlt/:eventId/:index'}
        render={props => (
          <div>
            <Navbar isShownSignInButtons={false} hasTabs={false} />
            <div style={{ height: '50px' }} />
            <section className="section cover">
              <div className="container">
                <AuthWrapper>
                  <EditLt {...props} />
                  <div style={{ height: '200px' }} />
                </AuthWrapper>
                <AuthWrapper isAuthenComponent={false}>
                  <LoginRequired canLoginAnonymously={false} />
                  <div style={{ height: '350px' }} />
                </AuthWrapper>
              </div>
            </section>
          </div>
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
                  <LoginRequired canLoginAnonymously={true} />
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
