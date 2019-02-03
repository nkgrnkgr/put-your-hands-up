import * as React from 'react';
import { Note } from 'domain/Note';
import TagLink from 'components/TagLink';
import { ago } from 'utils/DateTime';
import NoteContents from 'domain/NoteContents';
import Tag from 'domain/Tag';
export interface StickyNoteProps {
  note: Note;
  firestore: Firestore;
  auth: Auth;
  toggleDisplay: () => void;
  setOkAction: (okAction: () => void) => void;
  setNgAction: (ngAction: () => void) => void;
  addTag: (tag: Tag) => void;
}
const stickyNote: React.SFC<StickyNoteProps> = ({
  note,
  auth,
  firestore,
  toggleDisplay,
  setOkAction,
  setNgAction,
  addTag
}) => {
  const { user, noteContents } = note;
  let colorValue = '';
  if (typeof noteContents.color === 'string') {
    colorValue = noteContents.color;
  }
  const deleteNote = (id: string): void => {
    setOkAction(() => {
      firestore.delete({ collection: 'notes', doc: id });
    });
    toggleDisplay();
  };

  return (
    <div className="column is-3 animated bounceInUp">
      <div className="card">
        <div className="card-content" style={{ backgroundColor: colorValue }}>
          <div className="media">
            <div className="media-left">
              <figure className={`image is-32x32`}>
                <img src={user.photoURL} alt={user.uid} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-7">
                {user.displayName} - {minuteAgo(noteContents.created)}
                分前
              </p>
              <p className="subtitle is-7">{user.uid}</p>
            </div>
          </div>
          <div className="content">{noteContents.comment}</div>
          <div className="content">
            <div className="field is-grouped is-grouped-multiline">
              {noteContents.tagTitles.map((title, index) => (
                <TagLink
                  key={title}
                  index={index}
                  tagTitle={title}
                  size="is-small"
                  handleAdd={addTag}
                />
              ))}
            </div>
          </div>
        </div>
        <footer
          className="card-footer"
          style={{ backgroundColor: noteContents.color.toString() }}
        >
          <a
            href="#"
            className="card-footer-item"
            onClick={e => likeNote(firestore, note, auth.uid)}
          >
            <span className="icon">
              {isLiked(user.uid, noteContents.fansIds) ? (
                <i className="fas fa-heart" />
              ) : (
                <i className="far fa-heart" />
              )}
            </span>
            <span>{noteContents.fansIds.length}</span>
          </a>
          {auth.uid === note.noteContents.createUserId ? (
            <a
              href="#"
              className="card-footer-item"
              onClick={e => deleteNote(note.id)}
            >
              <span className="icon">
                <i className="fas fa-trash-alt" />
              </span>
            </a>
          ) : (
            ''
          )}
        </footer>
      </div>
    </div>
  );
};

const isLiked = (id: string, fansIds: string[]): boolean => {
  return fansIds.indexOf(id) !== -1;
};
const minuteAgo = (updated: number) => {
  return ago(updated, 'minute');
};

const likeNote = async (firestore: Firestore, note: Note, userId: string) => {
  if (note.noteContents.fansIds.indexOf(userId) === -1) {
    const ids = [...note.noteContents.fansIds, userId];
    const c: NoteContents = {
      ...note.noteContents,
      fansIds: ids
    };
    const updateItem = {
      ...note,
      noteContents: c
    };
    firestore.update({ collection: 'notes', doc: note.id }, updateItem);
  }
};

export default stickyNote;
