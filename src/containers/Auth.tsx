import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';

import Auth from 'components/Auth';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect } from 'react-redux-firebase';

interface StateProps {
  auth: Auth;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose(
  setDisplayName('EnhancedAuth'),
  firebaseConnect(),
  connect<StateProps>(mapStateToProps),
  pure
);

export default enhance(Auth);
