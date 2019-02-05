import * as React from 'react';
import SearchForm from 'components/Event/SearchForm';
import TagLink from 'components/TagLink';
import Tag from 'domain/Tag';

export interface SearchWrapperProps {
  query: string;
  tags: Tag[];
  searchQuery: (query: string) => void;
  addTag: (tag: Tag) => void;
  removeTag: (index: number) => void;
}

const searchWrapper: React.SFC<SearchWrapperProps> = ({
  query,
  tags,
  searchQuery,
  addTag,
  removeTag
}) => {
  return (
    <>
      <SearchForm query={query} searchQuery={searchQuery} addTag={addTag} />
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

export default searchWrapper;
