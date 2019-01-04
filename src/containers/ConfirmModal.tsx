import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import ConfirmModal, { ConfirmModalProps } from 'components/ConfirmModal';
import { CombinedState as State } from 'reducers/root';
import { toggleDisplay, ConfirmModalActionPayload } from 'actions/confirmModal';

interface StateProps {
  isActive: boolean;
  okAction: Function;
  ngAction: Function;
}

interface OuterProsp {
  message: string;
}

interface DispatchProps {
  toggleDisplay: () => void;
}

const mapStateToProps = (state: State) => ({
  isActive: state.application.isActiveConfirmModal,
  okAction: state.confirm.okAction,
  ngAction: state.confirm.ngAction
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

type EnhanceConfrmProps = StateProps & OuterProsp & DispatchProps;

const enhance = compose<EnhanceConfrmProps, OuterProsp>(
  setDisplayName('EnhanceComfirmModal'),
  connect<StateProps, DispatchProps, ConfirmModalProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(ConfirmModal);
