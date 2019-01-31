import * as React from 'react';
import SearchForm from 'components/Event/SearchForm';
import TagLink from 'components/TagLink';

export interface SearchWrapperProps {}

const searchWrapper: React.SFC<SearchWrapperProps> = props => {
  return (
    <div className="card" style={{ width: '70%', margin: '0 auto' }}>
      <div className="card-content">
        <div className="content">
          <SearchForm />
          <div>
            <TagLink
              index={0}
              tagTitle={'aaa'}
              size={'is-medium'}
              handleDelete={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default searchWrapper;
