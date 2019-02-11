import * as React from 'react';
import TagSearchResult from 'containers/Event/TagSearchResult';
export interface SearchResultsProps {
  query: string;
}
const searchResults: React.SFC<SearchResultsProps> = ({ query }) => {
  return (
    <div>
      {query === '' ? '' : <h5 className="title is-5">検索結果: {query}</h5>}
      <TagSearchResult />
    </div>
  );
};

export default searchResults;
