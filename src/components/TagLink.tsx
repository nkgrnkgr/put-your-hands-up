import * as React from 'react';

interface Props {
  index: number;
  tagTitle: string;
  size: string;
  handleDelete?: (index: number) => void;
}

const tagLink: React.SFC<Props> = ({ index, tagTitle, size, handleDelete }) => (
  <div className="control">
    <div className="tags has-addons">
      <span className={`tag ${size} is-info`}>
        <a href="#" style={{ color: '#FFFFFF' }}>
          {tagTitle}
        </a>
        {handleDelete ? (
          <a className="delete is-small" onClick={e => handleDelete(0)} />
        ) : (
          ''
        )}
      </span>
    </div>
  </div>
);

export default tagLink;
