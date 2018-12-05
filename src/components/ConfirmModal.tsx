import * as React from 'react';

export interface ConfirmModalProps {
  isActive: boolean;
  message: string;
  ok: () => void;
  cancel: () => void;
}

const confirmModal: React.SFC<ConfirmModalProps> = ({
  isActive = false,
  message = '',
  ok = () => {},
  cancel = () => {}
}) => (
  // <div className="modal is-active">
  <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-content">
      <div className="box">
        <div className="content has-text-centered">
          <p>
            <strong>{message}</strong>
          </p>
        </div>
        <div className="level">
          <p className="level-item" />
          <p className="level-item" />
          <p className="level-item" />
          <p className="level-item">
            <a className="button is-rounded" onClick={cancel}>
              キャンセル
            </a>
          </p>
          <p className="level-item">
            <a className="button is-danger is-rounded" onClick={ok}>
              OK
            </a>
          </p>
          <p className="level-item" />
          <p className="level-item" />
          <p className="level-item" />
        </div>
      </div>
    </div>
    <button className="modal-close is-large" aria-label="close" />
  </div>
);

export default confirmModal;
