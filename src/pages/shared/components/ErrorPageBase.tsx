import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Page } from './Page';
import { PageHeader } from '../containers/PageHeader';

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

export const ErrorPageBase: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <PageHeader />
        <Container>
          <div id="back-to-top-anchor" className={classes.app} />
          {children}
        </Container>
      </div>
    </Page>
  );
};
