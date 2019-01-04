import * as React from 'react';
import { NoteMap } from 'domain/Note';
import StickyNote from 'containers/StickyNote';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';

export interface CommentsBoardProps {
  notes?: NoteMap;
}

const commentsborad: React.SFC<CommentsBoardProps> = ({ notes = {} }) => (
  <div className="columns is-desktop">
    {Object.keys(notes).map(key => {
      return <StickyNote key={key} note={notes[key]} />;
    })}
    <ConfirmModal
      isActive={false}
      message="本当に削除してよろしいですか？"
      ok={f}
      cancel={f}
    />
    <InputForm />
  </div>
);

const f = () => {};

export default commentsborad;
