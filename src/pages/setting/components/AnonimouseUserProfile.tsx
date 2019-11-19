import React, { useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core';
import { CirclePicker } from 'react-color';
import {
  ANONYMOUS_COLOR_HEX,
  useUserColor,
  UserModel,
  AnonymousColor,
} from '../../../models/User';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    contents: {
      padding: theme.spacing(3),
    },
    item: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      minWidth: '100px',
      minHeight: '100px',
      border: '7px solid #ff3860',
      padding: theme.spacing(1),
      margin: theme.spacing(2),
    },
    form: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    selectColor: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  user: UserModel;
  setAnonymousUserInfo: (
    displayName: string,
    anonymousColor: AnonymousColor,
  ) => Promise<void>;
}

export const AnonimouseUserProfile: React.FC<Props> = ({
  user,
  setAnonymousUserInfo,
}) => {
  const classes = useStyles();

  const [displayName, setDisplayName] = useState(user.displayName);
  const [selectedColor, selectColorWithHex] = useUserColor(user.anonymousColor);
  const history = useHistory();

  const onClickSaveHandler = async () => {
    setAnonymousUserInfo(displayName, selectedColor).then(() => {
      history.push('/dashboard');
    });
  };

  return (
    <div className={classes.contents}>
      <Grid container alignItems="center">
        <Grid item sm={3} xs={12} className={classes.item}>
          <Avatar
            aria-label="userIcon"
            className={classes.avatar}
            src={selectedColor.anonymousImage}
          />
        </Grid>
        <Grid item sm={9} xs={12}>
          <form className={classes.form}>
            <TextField
              label="ユーザー名"
              defaultValue={displayName}
              margin="normal"
              variant="outlined"
              fullWidth
              inputProps={{ 'aria-label': 'bare' }}
              onChange={e => setDisplayName(e.currentTarget.value)}
            />
            <div className={classes.selectColor}>
              <CirclePicker
                colors={ANONYMOUS_COLOR_HEX}
                width={'100%'}
                onChange={props => selectColorWithHex(props.hex)}
              />
            </div>
          </form>
        </Grid>
      </Grid>
      <div>
        <Button
          className={classes.button}
          onClick={onClickSaveHandler}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            history.push('/dashboard');
          }}
          variant="outlined"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
