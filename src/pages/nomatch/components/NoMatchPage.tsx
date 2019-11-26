import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from '../../shared/components/Page';
import { PageHeader } from '../../shared/containers/PageHeader';
import { NotFound } from './NotFound';

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

export const NoMatchPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <PageHeader />
        <Container>
          <div id="back-to-top-anchor" className={classes.app} />
          <NotFound />
        </Container>
      </div>
    </Page>
  );
};
