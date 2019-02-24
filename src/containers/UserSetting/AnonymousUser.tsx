import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CombinedState as State } from 'reducers/root';
import {
  onChangeName,
  onSelectColorHex,
  UserSettingActionPayload
} from 'actions/userSetting';
import AnonymousUser, {
  AnonymousUserProps
} from 'components/UserSetting/AnonymousUser';
import { FirebaseUser } from 'domain/FirebaseUser';
import userInfo from 'lib/userInfo';

interface StateProps {
  auth: Auth;
  inputtingName: string;
  selectingColorHex: string;
}

interface OuterProps {
  user: FirebaseUser;
  setFieldValue: Function;
}

interface DispatchProps {
  onChangeName: (name: string) => void;
  onSelectColorHex: (hex: string) => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  inputtingName: state.userSetting.inputtingName,
  selectingColorHex: state.userSetting.selectingColorHex
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<UserSettingActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeName: (name: string) => onChangeName({ name }),
      onSelectColorHex: (hex: string) => onSelectColorHex({ hex })
    },
    dispatch
  );

type EnhancedProps = StateProps & DispatchProps;

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedTabs'),
  connect<StateProps, DispatchProps, AnonymousUserProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<EnhancedProps & OuterProps, {}, {}>({
    componentDidMount() {
      const hex = userInfo(this.props.auth).anonymousColor;
      this.props.onChangeName(userInfo(this.props.auth).displayName);
      this.props.onSelectColorHex(hex ? hex : '#000000');
    }
  }),
  pure
);

export default enhance(AnonymousUser);
