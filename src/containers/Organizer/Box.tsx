import { connect } from 'react-redux';
import { compose, setDisplayName, pure } from 'recompose';
import { withFirestore } from 'react-redux-firebase';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  toggleDisplay,
  ConfirmModalActionPayload,
  setOkAction,
  setNgAction
} from 'actions/confirmModal';
import Box, { BoxProps } from 'components/Organizer/Box';
import { Event } from 'domain/Event';

interface OuterProps {
  event: Event;
}

interface StateProps {}

interface DispatchProps {
  toggleDisplay: () => void;
  setOkAction: (action: () => void) => void;
  setNgAction: (action: () => void) => void;
}

const mapStateToProps = (state: StateProps) => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action<ConfirmModalActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay,
      setOkAction: (action: () => void) => setOkAction({ action }),
      setNgAction: (action: () => void) => setNgAction({ action })
    },
    dispatch
  );

type EnhancedBoxProps = StateProps & DispatchProps;

const enhance = compose<EnhancedBoxProps, OuterProps>(
  setDisplayName('EnhancedBox'),
  withFirestore,
  connect<StateProps, DispatchProps, BoxProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Box);
