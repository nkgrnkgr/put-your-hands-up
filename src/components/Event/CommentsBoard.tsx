import * as React from 'react';
import StickyNote from 'containers/StickyNote';
import { match } from 'react-router';
import { Note } from 'domain/Note';
import { getLtId } from 'domain/Lt';
import { Event } from 'domain/Event';
import { includeString } from 'utils/Compare';
import Tag from 'domain/Tag';

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
  query: string;
  tags: Tag[];
}

const includeQuery = (note: Note, query: string): boolean => {
  if (query === '') {
    return true;
  }
  return includeString(note.noteContents.comment, query);
};

const includeTag = (note: Note, tags: Tag[]): boolean => {
  if (!tags || tags.length === 0) {
    return true;
  }
  return note.noteContents.tagTitles.some(title => {
    return tags.some(tag => {
      if (includeString(tag.title, title)) {
        return true;
      }
      return false;
    });
  });
};

const commentsborad: React.SFC<CommentsBoardProps> = ({
  notes,
  event,
  selectedTabIndex,
  query,
  tags
}) => {
  if (notes) {
    const ltId = getLtId(selectedTabIndex, event);
    const selectedNotes = notes
      .filter(note => note.ltId === ltId)
      .filter(note => includeQuery(note, query))
      .filter(note => includeTag(note, tags));
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
