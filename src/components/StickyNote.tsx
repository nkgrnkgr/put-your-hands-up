import * as React from 'react';
import User from 'src/logic/domain/User';
import Note from 'src/logic/domain/Note';
import Image from 'src/logic/domain/Image';
import Tag from './Tag';
import { ago } from 'src/logic/utils/DateTime';

interface Props {
  user: User;
  image: Image;
  note: Note;
}

const stickyNote = (props: Props) => {
  const { user, image, note } = props;
  const isLikeNotYet = (id: string, fansIds: string[]): boolean => {
    return fansIds.indexOf(id) === -1;
  };
  const minuteAgo = (updated: number) => {
    return ago(updated, 'minute');
  };

  return (
    <div className="column">
      <div className="card">
        <header className="card-header has-text-centered is-Loading">
          {note.isUpdating ? (
            <p
              className="card-header-title"
              style={{ backgroundColor: '#74d76d', color: '#FFFFFF' }}
            >
              <span className="icon">
                <i className="fas fa-spinner fa-spin" />
              </span>
              更新しています
            </p>
          ) : (
            ''
          )}
        </header>
        <div className="card-content" style={{ backgroundColor: note.color }}>
          <div className="media">
            <div className="media-left">
              <figure className={`image is-${image.size}x${image.size}`}>
                <img src={image.url} alt={image.title} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-7">
                {user.username} - {minuteAgo(note.updated)}
                分前
              </p>
              <p className="subtitle is-7">@{user.id}</p>
            </div>
          </div>
          <div className="content">{note.comment}</div>
          <div className="content">
            <div className="field is-grouped is-grouped-multiline">
              {note.tagTitles.map((title, index) => (
                <Tag tagTitle={title} key={title} size="is-small" />
              ))}
            </div>
          </div>
        </div>
        <footer className="card-footer" style={{ backgroundColor: note.color }}>
          {note.editable ? (
            <a href="#" className="card-footer-item">
              <span>Edit</span>
              <span className="icon">
                <i className="fas fa-edit" />
              </span>
            </a>
          ) : (
            ''
          )}
          <a href="#" className="card-footer-item">
            <span className="icon">
              {isLikeNotYet(user.id, note.fansIds) ? (
                <i className="far fa-heart" />
              ) : (
                <i className="fas fa-heart" />
              )}
            </span>
            <span>{note.fansIds.length}</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

// const buttonMessage = 'Allow to Access Your Google Calendar';

export default stickyNote;
