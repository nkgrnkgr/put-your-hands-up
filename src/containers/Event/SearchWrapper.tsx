import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import SearchWrapper, {
  SearchWrapperProps
} from 'components/Event/SearchWrapper';
import { CombinedState as State } from 'reducers/root';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  searchQuery,
  addTag,
  removeTag,
  SearchActionPayload
} from 'actions/search';

interface StateProps {
  query: string;
  tags: Tag[];
}

interface DispatchProps {
  searchQuery: (query: string) => void;
  addTag: (tag: Tag) => void;
  removeTag: (index: number) => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  query: state.search.query,
  tags: state.search.tags
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<SearchActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      searchQuery: (query: string) => searchQuery({ query }),
      addTag: (tag: Tag) => addTag({ tag }),
      removeTag: (index: number) => removeTag({ index })
    },
    dispatch
  );

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedSearchWrapper'),
  connect<StateProps, DispatchProps, SearchWrapperProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(SearchWrapper);
