import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';

import AuthWrapper, { AuthWrapperProps } from 'components/AuthWrapper';
import { CombinedState as State } from 'reducers/root';

interface StateProps {
  auth: Auth;
}

interface OuterProps {
  isAuthenComponent?: boolean;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose<StateProps, OuterProps>(
  setDisplayName('EnhancedAuthWrapper'),
  connect<StateProps, {}, AuthWrapperProps>(mapStateToProps),
  pure
);

export default enhance(AuthWrapper);
