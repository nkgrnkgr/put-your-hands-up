import { compose, pure, setDisplayName } from 'recompose';
import LoginRequired from 'components/LoginRequired';
import { firebaseConnect } from 'react-redux-firebase';

const enhance = compose<{}, {}>(
  setDisplayName('EnhancedLoginRequired'),
  firebaseConnect(),
  pure
);

export default enhance(LoginRequired);
