import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Link,
} from '@material-ui/core';
import React from 'react';
import forbidden from '../../../images/_forbidden.svg';
import { ErrorPageBase } from '../../shared/components/ErrorPageBase';

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

export const Forbidden: React.FC = () => {
  const classes = useStyles();

  return (
    <ErrorPageBase>
      <div className={classes.root}>
        <main className={classes.main}>
          <img src={forbidden} alt="fobidden" className={classes.image} />
          <Typography variant="h3">Forbidden.</Typography>
          <Link href="/" color="secondary">
            home
          </Link>
        </main>
      </div>
    </ErrorPageBase>
  );
};
