import React from 'react';
import { Typography, Button, Theme, Icon, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { EventModel } from '../../../models/Event';
import { getYearMonthDayHourMitutes } from '../../../utils/datetime';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    contents: {
      margin: theme.spacing(2),
    },
  }),
);

interface Props {
  event: EventModel;
}

export const EventCard: React.FC<Props> = ({ event }) => {
  const classes = useStyles();
  const history = useHistory();
  const url = `${window.location.origin}/events/${event.id}`;

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.contents}>
        {event.name}
      </Typography>
      <Typography variant="body2" className={classes.contents}>
        開催日：{getYearMonthDayHourMitutes(event.date)}
      </Typography>
      <Typography variant="body2" className={classes.contents}>
        URL：
        <a aria-label={'url'} href={url} target="_brank" rel="noopener">
          {url}
        </a>
      </Typography>
      <Typography variant="body2" className={classes.contents}>
        登壇タイトル：
      </Typography>
      <ul>
        {event.lts.map((lt, index) => (
          <li key={index}>{lt.title}</li>
        ))}
      </ul>
      <Button
        variant="outlined"
        color="default"
        className={classes.contents}
        startIcon={<Icon className="far fa-edit" />}
        onClick={() => history.push(`/organizer/edit?${event.id}`)}
      >
        編集
      </Button>
    </Paper>
  );
};
