import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';

import { toggleDisplay, ConfirmModalActionPayload } from 'actions/confirmModal';

import ConfirmModal, { ConfirmModalProps } from 'components/ConfirmModal';

import { CombinedState as State } from 'reducers/root';

interface StateProps {
  isActive: boolean;
}

interface DispatchProps {
  toggleDisplay?: () => void;
}

const mapStateToProps = (state: State) => ({
  isActive: state.application.isActiveConfirmModal
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<ConfirmModalActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay
    },
    dispatch
  );

type EnhanceConfrmProps = StateProps & DispatchProps;

const enhance = compose<EnhanceConfrmProps, ConfirmModalProps>(
  setDisplayName('EnhanceComfirmModal'),
  connect<StateProps, DispatchProps, ConfirmModalProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(ConfirmModal);
