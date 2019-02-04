import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CombinedState as State } from 'reducers/root';
import { selectTab, TabActionPayload } from 'actions/tab';
import Tabs, { TabsProps } from 'components/Event/Tabs';
import { Event } from 'domain/Event';

interface StateProps {
  selectedTabIndex: number;
}

interface OuterProps {
  event: Event;
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
  setDisplayName('EnhancedTabs'),
  connect<StateProps, DispatchProps, TabsProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Tabs);
