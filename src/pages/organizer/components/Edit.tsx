import React from 'react';
import { EventModel } from '../../../models/Event';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';
import { EditForm } from '../containers/EditForm';

interface Props {
  event: EventModel | null;
}

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

export const Edit: React.FC<Props> = ({ event }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.contents}>
        イベントの編集
      </Typography>
      <EditForm event={event} />
    </>
  );
};
