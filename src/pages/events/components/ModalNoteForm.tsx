import { Divider } from '@material-ui/core';
import { FormikProps } from 'formik';
import React from 'react';
import { NoteContentsModel } from '../../../models/Note';
import { UserModel } from '../../../models/User';
import { ModalBase } from '../../shared/components/ModalBase';
import { ColorSelection } from './ColorSelection';
import { CommentForm } from './CommentForm';
import { NoteButtons } from './NoteButtons';
import { RecommendComments } from './RecommendComments';
import { TagForm } from './TagForm';

interface OuterProps {
  user: UserModel;
  open: boolean;
  sholdShowTwitter: boolean;
  sholdTwitterShare: boolean;
  toggleTwitterShare: () => void;
  onClose: () => void;
}

type Props = OuterProps & FormikProps<NoteContentsModel>;

export const ModalNoteForm: React.FC<Props> = props => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    open,
    onClose,
    sholdShowTwitter,
    sholdTwitterShare,
    toggleTwitterShare,
  } = props;

  return (
    <ModalBase open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <CommentForm rowCount={'4'} {...props} />
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
          sholdShowTwitter={sholdShowTwitter}
          sholdTwitterShare={sholdTwitterShare}
          toggleTwitterShare={toggleTwitterShare}
        />
      </form>
    </ModalBase>
  );
};
