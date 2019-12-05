import React from 'react';
import { createStyles, makeStyles, Theme, Container } from '@material-ui/core';
import { PageHeader } from '../../shared/containers/PageHeader';
import { Page } from '../../shared/components/Page';
import { RouteComponentProps } from 'react-router';
import { UserSetting } from '../containers/UserSetting';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '100px',
    },
  }),
);

export const SettingPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <PageHeader menuTitles={['dashboard', 'organizer']} />
        <Container>
          <div id="back-to-top-anchor" className={classes.app} />
          <UserSetting />
        </Container>
      </div>
    </Page>
  );
};
