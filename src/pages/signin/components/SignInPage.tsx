import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  Container,
  Typography,
  Grid,
} from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router';
import {
  signInWithAnonyMously,
  signInWithGoogle,
  signInWithTwitter,
  signOut,
} from '../../../firebase/api/authenticator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    title: {
      margin: theme.spacing(2),
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    button: {
      margin: theme.spacing(2),
    },
  }),
);

type Props = RouteComponentProps;

export const SignInPage: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();

  const buttons = [
    { name: 'Twitter', onClick: () => signInWithTwitter() },
    { name: 'Google', onClick: () => signInWithGoogle() },
    { name: '匿名', onClick: () => signInWithAnonyMously() },
  ];

  return (
    <div>
      <Grid container direction="row" justify="center" alignContent="center">
        {buttons.map(button => (
          <Grid item xs key={button.name}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={button.onClick}
              color="primary"
            >
              {button.name}でログイン
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>

    // <Typography className={classes.title} variant="h4" align="center">
    //   Welcome!
    // </Typography>
    // <Typography className={classes.title} variant="body1" align="center">
    //   ソーシャルアカウントまたは匿名でログイン
    // </Typography>
    // <div className={classes.content}>
    // </div>
  );
};
