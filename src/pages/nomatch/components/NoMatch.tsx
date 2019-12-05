import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Link,
} from '@material-ui/core';
import React from 'react';
import notfound from '../../../images/_notfound.svg';
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

export const NoMatch: React.FC = () => {
  const classes = useStyles();

  return (
    <ErrorPageBase>
      <div className={classes.root}>
        <main className={classes.main}>
          <img src={notfound} className={classes.image} />
          <Typography variant="h3">Not Found.</Typography>
          <Link href="/" color="secondary">
            home
          </Link>
        </main>
      </div>
    </ErrorPageBase>
  );
};
