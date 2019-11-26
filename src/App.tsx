import React from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Route } from 'react-router-dom';
import { ApplicationContextProvider } from './contexts/ApplicationContext';
import { EventPageContextProvider } from './contexts/EventPageContext';
import { UserContextProvider } from './contexts/UserContext';
import { IntegrationsContextProvider } from './contexts/IntegrationsContext';
import { ApiCallbackPage } from './pages/apicallbak/containers/ApiCallbackPage';
import { DashboardPage } from './pages/dashboard/components/DashboardPage';
import { Eventpage } from './pages/events/containers/EventPage';
import { LandingPage } from './pages/landing/components/LandingPage';
import { SettingPage } from './pages/setting/components/SettingPage';
import { UserInitializer } from './pages/shared/components/UserInitializer';
import { FirebaseAuthInitializer } from './pages/shared/components/FirebaseAuthInitializer';
import { ScrollTop } from './pages/shared/components/ScrollTop';
import { SignInPage } from './pages/signin/components/SignInPage';
import { OrganizerPage } from './pages/organizer/components/OrganizerPage';
import { Auth } from './pages/shared/components/Auth';

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
    <ApplicationContextProvider>
      <UserContextProvider>
        <IntegrationsContextProvider>
          <EventPageContextProvider>
            <FirebaseAuthInitializer>
              <div className={classes.root}>
                <ScrollTop />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signin" component={SignInPage} />
                <Route path="/apicallback" component={ApiCallbackPage} />
                <Auth>
                  <UserInitializer>
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/setting" component={SettingPage} />
                    <Route path="/events/:eventId" component={Eventpage} />
                    <Route path="/organizer" component={OrganizerPage} />
                  </UserInitializer>
                </Auth>
              </div>
            </FirebaseAuthInitializer>
          </EventPageContextProvider>
        </IntegrationsContextProvider>
      </UserContextProvider>
    </ApplicationContextProvider>
  );
};

export default App;
