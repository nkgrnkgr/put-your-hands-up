import * as React from 'react';
import { NoteMap } from 'domain/Note';
import StickyNote from 'containers/StickyNote';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';
import { match } from 'react-router';

interface Params {
  eventurl: string;
}
export interface CommentsBoardProps {
  auth: Auth;
  firestore: Firestore;
  match: match<Params>;
  notes: NoteMap;
}

const commentsborad: React.SFC<CommentsBoardProps> = ({
  notes = {},
  match
}) => (
  <div className="columns is-multiline">
    {notes === {} ? (
      Object.keys(notes).map(key => <StickyNote key={key} note={notes[key]} />)
    ) : (
      <div>
        <p>現在投稿はありません</p>
      </div>
    )}
    <ConfirmModal message="本当に削除してよろしいですか？" />
    <InputForm eventurl={match.params.eventurl} />
  </div>
);

export default commentsborad;
