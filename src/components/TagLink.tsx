import * as React from 'react';
import Tag from 'domain/Tag';

interface Props {
  index: number;
  tagTitle: string;
  size: string;
  handleAdd?: (tag: Tag) => void;
  handleDelete?: (index: number) => void;
}

const tagLink: React.SFC<Props> = ({
  index,
  tagTitle,
  size,
  handleAdd,
  handleDelete
}) => (
  <div className="control">
    <div className="tags has-addons">
      <span className={`tag ${size} is-info`}>
        <a
          onClick={e =>
            handleAdd ? handleAdd({ title: tagTitle, isFeatured: false }) : {}
          }
          style={{ color: '#FFFFFF' }}
        >
          {tagTitle}
        </a>
        {handleDelete ? (
          <a className="delete is-small" onClick={e => handleDelete(index)} />
        ) : (
          ''
        )}
      </span>
    </div>
  </div>
);

export default tagLink;
