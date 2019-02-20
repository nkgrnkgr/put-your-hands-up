import * as React from 'react';
import CommentForm from 'containers/Event/CommentForm';
import { Event } from 'domain/Event';

export interface CommentFormModalProps {
  event: Event;
  isActive: boolean;
  toggleDisplay: () => void;
}

const commentFormModal: React.SFC<CommentFormModalProps> = ({
  event,
  isActive,
  toggleDisplay
}) => {
  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">投稿する</p>
          <a className="delete" aria-label="close" onClick={toggleDisplay} />
        </header>
        <section className="modal-card-body">
          <CommentForm event={event} closeWrapper={toggleDisplay} />
        </section>
      </div>
    </div>
  );
};

export default commentFormModal;
