import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    contents: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(1),
    },
    item: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    status: {
      alignItems: 'center',
    },
  }),
);

interface Props {
  onClickDeleteButton: () => void;
}

export const DeleteUserButton: React.FC<Props> = ({ onClickDeleteButton }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={clsx(classes.item, classes.contents)}>
          <Typography variant="h6">ユーザーの削除</Typography>
        </Grid>
        <Grid item xs={12} className={clsx(classes.item, classes.contents)}>
          <Button
            onClick={onClickDeleteButton}
            variant="contained"
            color="primary"
          >
            DELETE USER
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
