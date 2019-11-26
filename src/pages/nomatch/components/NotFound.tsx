import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import empty from '../../../images/_empty.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    main: {
      width: '100%',
      maxWidth: 800,
      margin: '0 auto',
      textAlign: 'center',
    },
    image: {
      maxWidth: '40%',
    },
  }),
);

export const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <img src={empty} className={classes.image} />
        <Typography variant="h3">Not Found.</Typography>
      </main>
    </div>
  );
};
