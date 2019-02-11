import * as React from 'react';
import TagLink from 'components/TagLink';
import Tag from 'domain/Tag';

export interface TagSearchResultProps {
  tags: Tag[];
  removeTag: (index: number) => void;
}

const tagSearchResult: React.SFC<TagSearchResultProps> = ({
  tags,
  removeTag
}) => {
  return (
    <>
      {tags.length === 0 ? '' : <h5 className="title is-5">Tags:</h5>}
      <div className="field is-grouped is-grouped-multiline">
        {tags.map((tag, index) => {
          return (
            <TagLink
              key={index}
              index={index}
              tagTitle={tag.title}
              size={'is-medium'}
              handleDelete={removeTag}
            />
          );
        })}
      </div>
    </>
  );
};

export default tagSearchResult;
