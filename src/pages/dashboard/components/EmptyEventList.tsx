import React from 'react';
import empty from '../../../images/_empty.svg';
import { Typography, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    image: {
      margin: theme.spacing(5),
      maxWidth: '50%',
    },
  }),
);

export const EmptyEventList: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={empty} alt="empty" className={classes.image} />
      <Typography variant="body1">
        今まで参加したイベントはありません
      </Typography>
    </div>
  );
};
