import * as React from 'react';
import { Note } from 'domain/Note';
import TagLink from 'components/TagLink';
import { ago } from 'utils/DateTime';

interface StickyNoteProps {
  noteId: string;
  note: Note;
  removeNote: (oldNoteId: string) => void;
  auth: any;
}
const isLikeNotYet = (id: string, fansIds: string[]): boolean => {
  return fansIds.indexOf(id) === -1;
};
const minuteAgo = (updated: number) => {
  return ago(updated, 'minute');
};

const stickyNote: React.SFC<StickyNoteProps> = ({
  noteId,
  note,
  removeNote = () => {},
  auth
}) => {
  const { user, noteContents } = note;
  let colorValue = '';
  if (typeof noteContents.color === 'string') {
    colorValue = noteContents.color;
  }
  return (
    <div className="column">
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
                />
              ))}
            </div>
          </div>
        </div>
        <footer
          className="card-footer"
          style={{ backgroundColor: noteContents.color.toString() }}
        >
          <a href="#" className="card-footer-item">
            <span className="icon">
              {isLikeNotYet(user.uid, noteContents.fansIds) ? (
                <i className="far fa-heart" />
              ) : (
                <i className="fas fa-heart" />
              )}
            </span>
            <span>{noteContents.fansIds.length}</span>
          </a>
          {auth.uid === note.noteContents.createUserId ? (
            <a
              href="#"
              className="card-footer-item"
              onClick={e => removeNote(noteId)}
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

export default stickyNote;
