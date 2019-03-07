import { compose, pure, setDisplayName } from 'recompose';
import LoginRequired from 'components/LoginRequired';
import { firebaseConnect, withFirestore } from 'react-redux-firebase';
import { withRouter } from 'react-router';

interface OuterProps {
  isShowTitle?: boolean;
  canLoginAnonymously?: boolean;
}

const enhance = compose<{}, OuterProps>(
  setDisplayName('EnhancedLoginRequired'),
  firebaseConnect(),
  withFirestore,
  withRouter,
  pure
);

export default enhance(LoginRequired);
