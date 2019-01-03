import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Login from 'components/Login';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect } from 'react-redux-firebase';

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose(
  setDisplayName('EnhancedLogin'),
  firebaseConnect(),
  connect(mapStateToProps),
  pure
);

export default enhance(Login);
