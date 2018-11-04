import * as React from 'react';

interface Props {
  tagTitle: string;
  size: string;
}

const tag = (props: Props) => {
  const { tagTitle, size } = props;
  return (
    <div className="control">
      <div className="tags has-addons">
        <span className={`tag ${size} is-info`}>
          <a href="#" style={{ color: '#FFFFFF' }}>
            {tagTitle}
          </a>
          <button className="delete is-small" />
        </span>
      </div>
    </div>
  );
};

export default tag;
