import * as React from 'react';

export interface FloatButtonProps {
  toggleDisplay: () => void;
  changeStateCommentForm: (shouldOpen: boolean) => void;
}

const floatButton: React.SFC<FloatButtonProps> = ({
  toggleDisplay,
  changeStateCommentForm
}) => {
  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    toggleDisplay();
    changeStateCommentForm(true);
  };
  return (
    <a
      className={`button is-medium is-danger is-rounded`}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        height: '55px'
      }}
      onClick={e => handleOnClick(e)}
    >
      <span className="icon is-small">
        <i className="fas fa-pen" />
      </span>
    </a>
  );
};

export default floatButton;
