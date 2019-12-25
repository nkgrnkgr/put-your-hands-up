import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { MobileMenuSideBar } from '../../events/components/MobileMenuSideBar';
import { Page } from '../../shared/components/Page';
import { PublicPageHeader } from '../../shared/components/PublicPageHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '50px',
    },
    content: {
      marginBottom: theme.spacing(5),
    },
    contentsContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      backgroundColor: '#fff',
    },
    title: {
      fontFamily: 'Josefin Sans,sans-serif',
      fontWeight: 'lighter',
    },
    subTitle: {
      marginBottom: theme.spacing(4),
    },
    centerWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    imageTop: {
      width: '100%',
    },
    logo: {
      width: '32px',
    },
    button: {
      textAlign: 'center',
      margin: theme.spacing(1),
    },
    section: {
      background: '#fff',
      padding: theme.spacing(1),
    },
  }),
);

export const LandingPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const [isOpenSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(!isOpenSideBar);
  };

  return (
    <>
      <Page>
        <PublicPageHeader onClickMenuBar={toggleSideBar} />
        <MobileMenuSideBar
          isSidebarOpen={isOpenSideBar}
          toggleSideBar={toggleSideBar}
        />
        <div id="back-to-top-anchor" className={classes.app} />
      </Page>
    </>
  );
};
