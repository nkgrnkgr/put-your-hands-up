import React from 'react';
import { createStyles, makeStyles, Theme, Button } from '@material-ui/core';
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
      flexGrow: 1,
    },
  }),
);

type Props = RouteComponentProps;

export const SignInPage: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <button onClick={() => signInWithTwitter()}>Sign In with Twitter</button>
      <button onClick={() => signInWithGoogle()}>Sign In with Google</button>
      <button onClick={() => signInWithAnonyMously()}>
        Sign In Anonymously
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/dashboard')}
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
};
