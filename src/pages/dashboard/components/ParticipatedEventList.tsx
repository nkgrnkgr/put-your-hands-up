import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { IconLink } from '../../shared/components/IconLink';
import { EventModel } from '../../../models/Event';
import { getYearMonthDayHourMitutes } from '../../../utils/datetime';
import { useHistory } from 'react-router';
import { EmptyEventList } from './EmptyEventList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    participatedEventList: {
      marginTop: theme.spacing(4),
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface Props {
  eventList: EventModel[];
}

export const ParticipatedEventList: React.FC<Props> = ({ eventList }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      {eventList.length === 0 && <EmptyEventList />}
      {eventList.length !== 0 && (
        <div className={classes.participatedEventList}>
          <List component="nav" aria-label="visited event list">
            {eventList.map(event => (
              <ListItem
                button
                key={event.name}
                onClick={() => history.push(`/events/${event.id}`)}
              >
                <ListItemIcon>
                  <IconLink
                    title={event.name}
                    className="far fa-calendar-alt"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={event.name}
                  secondary={getYearMonthDayHourMitutes(event.date)}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};
