import {
  Button,
  createStyles,
  Grid,
  Icon,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  signInWithAnonyMously,
  signInWithGoogle,
  signInWithTwitter,
} from '../../../firebase/api/authenticator';
import pyhuloge_pink from '../../../images/pyhuloge_pink.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    container: {
      margin: theme.spacing(2),
    },
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(5),
    },
    imgWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    logo: {
      width: '250px',
    },
    buttonContent: {
      textAlign: 'center',
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
      width: '100%',
    },
    icon: {
      margin: theme.spacing(1),
    },
  }),
);

export const SignInPage: React.FC = () => {
  const classes = useStyles();
  const buttons = [
    {
      name: 'Twitter',
      onClick: () => signInWithTwitter(),
      iconName: 'fab fa-twitter',
    },
    {
      name: 'Google',
      onClick: () => signInWithGoogle(),
      iconName: 'fab fa-google',
    },
    {
      name: '匿名',
      onClick: () => signInWithAnonyMously(),
      iconName: 'fas fa-user-secret',
      paddingRight: '27px',
    },
  ];

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignContent="center"
    >
      <div className={classes.container}>
        <Grid container direction="column" alignContent="center">
          <Grid item xs>
            <div className={classes.imgWrapper}>
              <img src={pyhuloge_pink} className={classes.logo} />
            </div>
          </Grid>

          <Grid item xs>
            <Typography className={classes.title} variant="h4" align="center">
              PUT YOUR HANDS UP
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column">
          {buttons.map(button => (
            <Grid className={classes.buttonContent} item xs key={button.name}>
              <div>
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={button.onClick}
                  color="secondary"
                  startIcon={
                    <Icon className={clsx(button.iconName, classes.icon)} />
                  }
                >
                  <span style={{ paddingRight: button.paddingRight }}>
                    {button.name}でログイン
                  </span>
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
  );
};
