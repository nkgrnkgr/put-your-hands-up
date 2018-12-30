import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Login, { LoginProps } from 'components/Login';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { CombinedState as State } from 'reducers/root';
import { LoginUser } from 'domain/LoginUser';
import { login, logout, LoginActionPayload } from 'actions/login';
import { firebaseConnect } from 'react-redux-firebase';

interface StateProps {
  loginUser: LoginUser;
}

interface DispatchProps {
  login: (loginUser: LoginUser) => void;
  logout: () => void;
}

const mapStateToProps = (state: State) => ({
  loginUser: state.application.loginUser,
  auth: state.firebase.auth
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<LoginActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      logout,
      login: (loginUser: LoginUser) => login({ loginUser })
    },
    dispatch
  );

type EnhancedLoginbarProps = StateProps & DispatchProps;

const enhance = compose<EnhancedLoginbarProps, {}>(
  setDisplayName('EnhancedLogin'),
  firebaseConnect(),
  connect<StateProps, DispatchProps, LoginProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Login);
