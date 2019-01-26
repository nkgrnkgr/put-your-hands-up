import * as React from 'react';
import { NoteMap } from 'domain/Note';
import StickyNote from 'containers/StickyNote';
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
  </div>
);

export default commentsborad;
