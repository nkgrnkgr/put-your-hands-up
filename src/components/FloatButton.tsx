import * as React from 'react';

export interface FloatButtonProps {
  toggleDisplay: () => void;
}

const floatButton: React.SFC<FloatButtonProps> = ({ toggleDisplay }) => {
  return (
    <a
      className="button is-medium is-danger is-rounded"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        height: '55px'
      }}
      onClick={toggleDisplay}
    >
      <span className="icon is-small">
        <i className="fas fa-pen" />
      </span>
    </a>
  );
};

export default floatButton;
