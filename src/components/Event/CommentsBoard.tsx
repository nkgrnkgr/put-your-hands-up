import * as React from 'react';
import StickyNote from 'containers/StickyNote';
import { match } from 'react-router';
import { Note } from 'domain/Note';
import { getLtId } from 'domain/Lt';
import { Event } from 'domain/Event';

interface Params {
  eventurl: string;
}
export interface CommentsBoardProps {
  auth: Auth;
  firestore: Firestore;
  match: match<Params>;
  notes: Note[];
  event: Event;
  selectedTabIndex: number;
}

const commentsborad: React.SFC<CommentsBoardProps> = ({
  notes,
  event,
  selectedTabIndex
}) => {
  if (notes) {
    const ltId = getLtId(selectedTabIndex, event);
    const selectedNotes = notes.filter(note => note.ltId === ltId);
    if (selectedNotes.length > 0) {
      return (
        <div className="columns is-multiline">
          {selectedNotes.map((note, index) => {
            return <StickyNote key={note.id} note={note} />;
          })}
        </div>
      );
    }
    return (
      <div>
        <p>現在投稿はありません</p>
      </div>
    );
  }
  return (
    <div>
      <p>現在投稿はありません</p>
    </div>
  );
};

export default commentsborad;
