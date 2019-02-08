import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import SortTabs, { SortTabProps } from 'components/Event/SortTabs';
import { CombinedState as State } from 'reducers/root';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { setSortKey, SortActionPayload } from 'actions/sort';

interface StateProps {
  sortKey: string;
}

interface DispatchProps {
  setSortKey: (sortKey: string) => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  sortKey: state.sort.sortKey
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<SortActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      setSortKey: (sortKey: string) => setSortKey({ sortKey })
    },
    dispatch
  );

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedSortForm'),
  connect<StateProps, DispatchProps, SortTabProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(SortTabs);
