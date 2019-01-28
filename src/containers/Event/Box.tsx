import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CombinedState as State } from 'reducers/root';
import { selectTab, TabActionPayload } from 'actions/tab';
import Box, { BoxProps } from 'components/Event/Box';
import { Lt } from 'domain/Lt';

interface StateProps {}

interface OuterProps {
  lt: Lt;
  index: number;
}

interface DispatchProps {
  selectTab: (selectedTabIndex: number) => void;
}

const mapStateToProps = (state: State) => ({
  selectedTabIndex: state.application.selectedTabIndex
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<TabActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      selectTab: (selectedTabIndex: number) => selectTab({ selectedTabIndex })
    },
    dispatch
  );

type EnhanceConfrmProps = StateProps & DispatchProps;

const enhance = compose<EnhanceConfrmProps, OuterProps>(
  setDisplayName('EnhanceComfirmModal'),
  connect<StateProps, DispatchProps, BoxProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Box);
