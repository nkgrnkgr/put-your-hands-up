import {
  Avatar,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { FormikProps } from 'formik';
import React from 'react';
import { NoteContentsModel } from '../../../models/Note';
import { UserModel } from '../../../models/User';

interface OuterProps {
  user: UserModel;
  rowCount: string;
  handleOnForcus?: () => void;
}

type Props = OuterProps & FormikProps<NoteContentsModel>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    avatar: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
  }),
);

export const CommentForm: React.FC<Props> = props => {
  const { user, rowCount, values, handleChange } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} src={user.avatarUrl} />
      <TextField
        name="comment"
        value={values.comment}
        placeholder="コメントを入力..."
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
        rows={rowCount}
        onChange={handleChange}
      />
    </div>
  );
};
