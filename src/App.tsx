import React from 'react';
import { Route } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/components/DashboardPage';
import { LandingPage } from './pages/landing/components/LandingPage';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { SettingPage } from './pages/setting/components/SettingPage';
import { SignInPage } from './pages/signin/components/SignInPage';
import { FirebaseAuthInitializer } from './pages/shared/components/FirebaseAuthInitializer';
import { ApplicationContextProvider } from './contexts/ApplicationContext';
import { UserContextProvider } from './contexts/UserContext';
import { Eventpage } from './pages/events/containers/EventPage';
import { Auth } from './pages/shared/components/Auth';
import { ScrollTop } from './pages/shared/components/ScrollTop';
import { EventPageContextProvider } from './contexts/EventPageContext';
import { ApiCallbackPage } from './pages/apicallbak/containers/ApiCallbackPage';

const useStyles = makeStyles((theme: Theme) =>
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
        <EventPageContextProvider>
          <FirebaseAuthInitializer>
            <div className={classes.root}>
              <ScrollTop />
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signin" component={SignInPage} />
              <Route path="/apicallback" component={ApiCallbackPage} />
              <Auth>
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/setting" component={SettingPage} />
                <Route path="/events/:eventId" component={Eventpage} />
              </Auth>
            </div>
          </FirebaseAuthInitializer>
        </EventPageContextProvider>
      </UserContextProvider>
    </ApplicationContextProvider>
  );
};

export default App;
