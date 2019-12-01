import {
  createStyles,
  Divider,
  Hidden,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { FormikProps } from 'formik';
import React from 'react';
import { NoteContentsModel } from '../../../models/Note';
import { UserModel } from '../../../models/User';
import { ColorSelection } from './ColorSelection';
import { CommentForm } from './CommentForm';
import { NoteButtons } from './NoteButtons';
import { RecommendComments } from './RecommendComments';
import { TagForm } from './TagForm';

interface OuterProps {
  user: UserModel;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  sholdShowTwitter: boolean;
  sholdTwitterShare: boolean;
  toggleTwitterShare: () => void;
}

type Props = OuterProps & FormikProps<NoteContentsModel>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(1, 3),
    },
  }),
);

export const NoteForm: React.FC<Props> = props => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    open,
    onOpen,
    onClose,
    sholdShowTwitter,
    sholdTwitterShare,
    toggleTwitterShare,
  } = props;

  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit}>
          <CommentForm
            {...props}
            rowCount={open ? '4' : '1'}
            handleOnForcus={onOpen}
          />
          {open && (
            <>
              <RecommendComments
                handleOnClick={(comment: string) =>
                  setFieldValue('comment', values.comment + comment)
                }
              />
              <Divider />
              <TagForm {...props} />
              <Divider />
              <ColorSelection {...props} />
              <Divider />
              <NoteButtons
                handleOnClickCloseButton={onClose}
                sholdShowTwitter={sholdShowTwitter}
                sholdTwitterShare={sholdTwitterShare}
                toggleTwitterShare={toggleTwitterShare}
              />
            </>
          )}
        </form>
      </Paper>
    </Hidden>
  );
};
