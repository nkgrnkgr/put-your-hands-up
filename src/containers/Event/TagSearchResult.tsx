import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import TagSearchResult, {
  TagSearchResultProps
} from 'components/Event/TagSearchResult';
import { CombinedState as State } from 'reducers/root';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { removeTag, SearchActionPayload } from 'actions/search';

interface StateProps {
  tags: Tag[];
}

interface DispatchProps {
  removeTag: (index: number) => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  tags: state.search.tags
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<SearchActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      removeTag: (index: number) => removeTag({ index })
    },
    dispatch
  );

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedTagSearchResult'),
  connect<StateProps, DispatchProps, TagSearchResultProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(TagSearchResult);
