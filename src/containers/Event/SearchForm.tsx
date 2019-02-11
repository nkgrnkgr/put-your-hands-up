import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import SearchForm, { SearchFormProps } from 'components/Event/SearchForm';
import { CombinedState as State } from 'reducers/root';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { searchQuery, addTag, SearchActionPayload } from 'actions/search';

interface StateProps {
  query: string;
}

interface DispatchProps {
  searchQuery: (query: string) => void;
  addTag: (tag: Tag) => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  query: state.search.query
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<SearchActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      searchQuery: (query: string) => searchQuery({ query }),
      addTag: (tag: Tag) => addTag({ tag })
    },
    dispatch
  );

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedSearchForm'),
  connect<StateProps, DispatchProps, SearchFormProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(SearchForm);
