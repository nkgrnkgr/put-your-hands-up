import {
  Button,
  createStyles,
  Grid,
  Icon,
  makeStyles,
  Theme,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
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
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: 128,
      height: 128,
    },
    logo: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      margin: theme.spacing(1),
      width: 500,
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
      direction="column"
      justify="center"
      alignContent="center"
    >
      <Grid item className={classes.wrapper}>
        <ButtonBase className={classes.image}>
          <img src={pyhuloge_pink} alt="logo" className={classes.logo} />
        </ButtonBase>
      </Grid>
      <Grid item>
        <Typography className={classes.title} variant="h4" align="center">
          PUT YOUR HANDS UP
        </Typography>
      </Grid>
      {buttons.map(button => (
        <Grid item className={classes.wrapper}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={button.onClick}
            color="secondary"
            startIcon={<Icon className={clsx(button.iconName, classes.icon)} />}
          >
            <span style={{ paddingRight: button.paddingRight }}>
              {button.name}でログイン
            </span>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
