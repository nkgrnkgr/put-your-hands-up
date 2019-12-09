import React, { useContext } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { PageHeader } from '../../shared/containers/PageHeader';
import { ParticipatedEventList } from '../containers/ParticipatedEventList';
import { Page } from '../../shared/components/Page';
import { RouteComponentProps } from 'react-router';
import {
  listNotesByUid,
  listReplyCommentsByUid,
  listEventsByUid,
} from '../../../firebase/api/fortest';
import { UserContext } from '../../../contexts/UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    app: {
      height: '100px',
    },
    eventList: {
      width: '100%',
      maxWidth: 800,
      margin: '0 auto',
    },
    title: {
      margin: theme.spacing(2),
    },
  }),
);

export const DashboardPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const onClick = async () => {
    // const list = await listNotesByUid(user.uid);
    const list = await listReplyCommentsByUid(user.uid);
    // console.log(list);
  };

  return (
    <Page>
      <div className={classes.root}>
        <PageHeader menuTitles={['setting', 'organizer']} />
        <Container>
          <div id="back-to-top-anchor" className={classes.app} />
          <div className={classes.eventList}>
            <Button variant="contained" color="primary" onClick={onClick}>
              test
            </Button>
            <Typography variant="h4" className={classes.title}>
              参加したイベント
            </Typography>
            <ParticipatedEventList />
          </div>
        </Container>
      </div>
    </Page>
  );
};
