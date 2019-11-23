import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
} from '@material-ui/core';
import { PageHeader } from '../../shared/containers/PageHeader';
import { Page } from '../../shared/components/Page';
import { RouteComponentProps, Route } from 'react-router';
import { List } from '../containers/List';
import { Edit } from '../containers/Edit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '100px',
    },
    main: {
      width: '100%',
      maxWidth: 800,
      margin: '0 auto',
    },
    title: {
      margin: theme.spacing(2),
    },
  }),
);

export const OrganizerPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <PageHeader />
        <Container>
          <div id="back-to-top-anchor" className={classes.app} />
          <Route exact path="/organizer" component={List} />
          <Route path="/organizer/edit" component={Edit} />
        </Container>
      </div>
    </Page>
  );
};
