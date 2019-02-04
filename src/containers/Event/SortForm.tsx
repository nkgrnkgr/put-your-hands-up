import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import SortForm, { SortFormProps } from 'components/Event/SortForm';
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
  connect<StateProps, DispatchProps, SortFormProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(SortForm);
