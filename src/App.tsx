import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApiCallbackPage } from './pages/apicallbak/containers/ApiCallbackPage';
import { DashboardPage } from './pages/dashboard/components/DashboardPage';
import { Eventpage } from './pages/events/containers/EventPage';
import { Forbidden } from './pages/forbidden/components/Forbidden';
import { LandingPage } from './pages/landing/components/LandingPage';
import { NoMatch } from './pages/nomatch/components/NoMatch';
import { OrganizerPage } from './pages/organizer/components/OrganizerPage';
import { SettingPage } from './pages/setting/components/SettingPage';
import { FirebaseAuthInitializer } from './pages/shared/components/FirebaseAuthInitializer';
import { FirebaseAuthLoadedListener } from './pages/shared/components/FirebaseAuthLoadedListener';
import { PrivateRoute } from './pages/shared/components/PrivateRoute';
import { ResisterdRoute } from './pages/shared/components/ResisteredRoute';
import { ScrollTop } from './pages/shared/components/ScrollTop';
import { UserInitializer } from './pages/shared/components/UserInitializer';
import { ConfirmDialog } from './pages/shared/containers/ConfirmDialog';
import { Notification } from './pages/shared/containers/Notification';
import { SignInPage } from './pages/signin/containers/SignInPage';
import { ContextInjection } from './contexts/ContextInjection';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ContextInjection>
      <FirebaseAuthInitializer>
        <FirebaseAuthLoadedListener>
          <div className={classes.root}>
            <ScrollTop />
            <Notification />
            <ConfirmDialog />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/apicallback" component={ApiCallbackPage} />
              <PrivateRoute>
                <UserInitializer>
                  <Switch>
                    <Route path="/forbidden" component={Forbidden} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/setting" component={SettingPage} />
                    <Route path="/events/:eventId" component={Eventpage} />
                    <ResisterdRoute>
                      <Switch>
                        <Route path="/organizer" component={OrganizerPage} />
                        <Route path="*" component={NoMatch} />
                      </Switch>
                    </ResisterdRoute>
                  </Switch>
                </UserInitializer>
              </PrivateRoute>
            </Switch>
          </div>
        </FirebaseAuthLoadedListener>
      </FirebaseAuthInitializer>
    </ContextInjection>
  );
};

export default App;
