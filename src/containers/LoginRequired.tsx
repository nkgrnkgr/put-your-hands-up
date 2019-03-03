import { compose, pure, setDisplayName } from 'recompose';
import LoginRequired from 'components/LoginRequired';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';

interface OuterProps {
  canLoginAnonymously?: boolean;
}

const enhance = compose<{}, OuterProps>(
  setDisplayName('EnhancedLoginRequired'),
  firebaseConnect(),
  withRouter,
  pure
);

export default enhance(LoginRequired);
