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
      <div
        className="modal-card animated fastest fadeInUp"
        style={{ borderRadius: '10px' }}
      >
        <section className="modal-card-body">
          <CommentForm event={event} closeWrapper={toggleDisplay} />
        </section>
      </div>
    </div>
  );
};

export default commentFormModal;
