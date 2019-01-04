import * as React from 'react';

export interface ConfirmModalProps {
  isActive: boolean;
  message: string;
  okAction: Function;
  ngAction: Function;
  toggleDisplay: () => void;
}

const confirmModal: React.SFC<ConfirmModalProps> = ({
  isActive = false,
  message = '',
  okAction,
  ngAction,
  toggleDisplay
}) => {
  const ok = () => {
    okAction();
    toggleDisplay();
  };
  const ng = () => {
    ngAction();
    toggleDisplay();
  };

  return (
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
              <a className="button is-rounded" onClick={e => ng()}>
                キャンセル
              </a>
            </p>
            <p className="level-item">
              <a className="button is-danger is-rounded" onClick={e => ok()}>
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
};

export default confirmModal;
