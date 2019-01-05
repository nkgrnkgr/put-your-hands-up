import * as React from 'react';
import { NoteMap } from 'domain/Note';
import StickyNote from 'containers/StickyNote';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';

export interface CommentsBoardProps {
  notes?: NoteMap;
}

const commentsborad: React.SFC<CommentsBoardProps> = ({ notes = {} }) => (
  <div className="columns is-multiline">
    {Object.keys(notes).map(key => {
      return <StickyNote key={key} note={notes[key]} />;
    })}
    <ConfirmModal message="本当に削除してよろしいですか？" />
    <InputForm />
  </div>
);

export default commentsborad;
