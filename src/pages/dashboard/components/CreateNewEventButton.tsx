import React from 'react';
import { Button, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(2),
    },
  }),
);

export const CreateNewEventButton: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push('organizer/edit')}
      >
        新しいイベントを作成する
      </Button>
    </div>
  );
};
