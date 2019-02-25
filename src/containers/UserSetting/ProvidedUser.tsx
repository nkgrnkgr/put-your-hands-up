import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { CombinedState as State } from 'reducers/root';
import {
  onChangeName,
  onChangeTwitterId,
  UserSettingActionPayload
} from 'actions/userSetting';
import ProvidedUser, {
  ProvidedUserProps
} from 'components/UserSetting/ProvidedUser';
import { FirebaseUser } from 'domain/FirebaseUser';
import userInfo from 'lib/userInfo';

interface StateProps {
  auth: Auth;
}

interface OuterProps {
  user: FirebaseUser;
  setFieldValue: Function;
}

interface DispatchProps {
  onChangeName: (name: string) => void;
  onChangeTwitterId: (twitterId: string) => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<UserSettingActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeName: (name: string) => onChangeName({ name }),
      onChangeTwitterId: (twitterId: string) => onChangeTwitterId({ twitterId })
    },
    dispatch
  );

type EnhancedProps = StateProps & DispatchProps;

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedProvidedUser'),
  connect<StateProps, DispatchProps, ProvidedUserProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<EnhancedProps & OuterProps, {}, {}>({
    componentDidMount() {
      this.props.onChangeName(userInfo(this.props.auth).displayName);
    }
  }),
  pure
);

export default enhance(ProvidedUser);
