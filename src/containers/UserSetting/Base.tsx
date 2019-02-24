import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import Base, { BaseProps } from 'components/UserSetting/Base';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect, withFirestore } from 'react-redux-firebase';
import {
  onChangeDeleteMe,
  UserSettingActionPayload
} from 'actions/userSetting';

interface StateProps {
  auth: Auth;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  name: state.userSetting.inputtingName,
  hex: state.userSetting.selectingColorHex,
  deleteMe: state.userSetting.inputtingDeleteMe
});

interface DispatchProps {
  onChangeDeleteMe: (deleteMe: string) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<UserSettingActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeDeleteMe: (deleteMe: string) => onChangeDeleteMe({ deleteMe })
    },
    dispatch
  );

const enhance = compose<StateProps, {}>(
  setDisplayName('EnhancedSetting'),
  firebaseConnect(),
  withFirestore,
  connect<StateProps, DispatchProps, BaseProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Base);
