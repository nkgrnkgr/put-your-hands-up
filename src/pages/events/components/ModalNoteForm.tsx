import {
  createStyles,
  Divider,
  makeStyles,
  Modal,
  Theme,
  Paper,
  Backdrop,
  Fade,
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
  sholdTwitterShare: boolean;
  toggleTwitterShare: () => void;
  onClose: () => void;
}

type Props = OuterProps & FormikProps<NoteContentsModel>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      maxWidth: 800,
      padding: theme.spacing(1, 3),
      margin: theme.spacing(1),
    },
  }),
);

export const ModalNoteForm: React.FC<Props> = props => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    open,
    onClose,
    sholdTwitterShare,
    toggleTwitterShare,
  } = props;

  const classes = useStyles();

  return (
    <Modal
      open={open}
      className={classes.root}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClose={() => onClose()}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <CommentForm rowCount={'4'} {...props} handleOnForcus={() => {}} />
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
              handleOnClickCloseButton={() => onClose()}
              sholdTwitterShare={sholdTwitterShare}
              toggleTwitterShare={toggleTwitterShare}
            />
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};
