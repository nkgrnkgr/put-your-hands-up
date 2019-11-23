import React from 'react';
import { Typography, Button, Theme, Icon, Divider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { EventModel } from '../../../models/Event';
import { EventCard } from './EventCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    contents: {
      margin: theme.spacing(2),
    },
  }),
);

interface Props {
  eventList: EventModel[];
}

export const List: React.FC<Props> = ({ eventList }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Typography variant="h4" className={classes.contents}>
        イベントの管理
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.contents}
        startIcon={<Icon className="fas fa-plus" />}
        onClick={() => history.push('/organizer/edit')}
      >
        新しくイベントを作成する
      </Button>
      <Divider />
      <Typography variant="h5" className={classes.contents}>
        イベント
      </Typography>
      {eventList.length === 0 && (
        <Typography variant="body1" className={classes.contents}>
          表示可能なイベントがありません
        </Typography>
      )}
      <div className={classes.contents}>
        {eventList.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </>
  );
};
