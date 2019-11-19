import {
  Avatar,
  Button,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { UserModel } from '../../../models/User';
import { FormikProps } from 'formik';
import { CommentContensModel } from '../../../models/ReplyComment';

interface OuterProps {
  loginUser: UserModel;
  onCancelClick: () => void;
}

type Props = FormikProps<CommentContensModel> & OuterProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    inline: {
      display: 'inline',
    },
    replay: {
      paddingLeft: theme.spacing(5),
    },
    form: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(2),
    },
    button: {
      color: '#fff',
      marginRight: theme.spacing(1),
    },
  }),
);

export const ReplyCommentForm: React.FC<Props> = ({
  loginUser,
  handleSubmit,
  handleChange,
  onCancelClick,
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.replay} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={loginUser.displayName} src={loginUser.avatarUrl} />
        </ListItemAvatar>
        <ListItemText primary={loginUser.displayName} />
      </ListItem>
      <li className={classes.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              multiline
              name="comment"
              rows={'4'}
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            返信
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => onCancelClick()}
          >
            キャンセル
          </Button>
        </form>
      </li>
    </>
  );
};
