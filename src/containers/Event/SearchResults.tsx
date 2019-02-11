import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { CombinedState as State } from 'reducers/root';
import SearchResults, {
  SearchResultsProps
} from 'components/Event/SearchResults';

interface StateProps {
  query: string;
}

const mapStateToProps = (state: State) => ({
  query: state.search.query
});

const enhance = compose<StateProps, {}>(
  setDisplayName('EnhancedSearchResults'),
  connect<StateProps, {}, SearchResultsProps>(mapStateToProps),
  pure
);

export default enhance(SearchResults);
