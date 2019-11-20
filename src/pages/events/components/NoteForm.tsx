import {
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Hidden,
} from '@material-ui/core';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { NoteContentsModel } from '../../../models/Note';
import { UserModel } from '../../../models/User';
import { ColorSelection } from './ColorSelection';
import { CommentForm } from './CommentForm';
import { NoteButtons } from './NoteButtons';
import { RecommendComments } from './RecommendComments';
import { TagForm } from './TagForm';

interface OuterProps {
  user: UserModel;
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
    sholdShowTwitter,
    sholdTwitterShare,
    toggleTwitterShare,
  } = props;

  const [isExpanded, setExpanded] = useState(false);
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <Paper className={classes.root}>
        <form onSubmit={handleSubmit}>
          <CommentForm
            {...props}
            rowCount={isExpanded ? '4' : '1'}
            handleOnForcus={() => setExpanded(true)}
          />
          {isExpanded && (
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
                handleOnClickCloseButton={() => setExpanded(false)}
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
