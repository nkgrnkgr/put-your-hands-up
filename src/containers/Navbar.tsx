import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Navbar, { NavbarProps } from 'components/Navbar';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { toggleMobileMenu } from 'actions/mobileMenu';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect, withFirestore } from 'react-redux-firebase';
import { Event } from 'domain/Event';
import { withRouter } from 'react-router';

interface StateProps {
  auth: Auth;
}

interface OuterProps {
  isShownSignInButtons?: boolean;
  isShownSearch?: boolean;
  isShownUserIcon?: boolean;
  isShownNavLink?: boolean;
  hasTabs?: boolean;
  event?: Event;
}

interface DispatchProps {
  toggleMobileMenu: () => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  isActiveMobileMenu: state.application.isActiveMobileMenu
});

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): DispatchProps =>
  bindActionCreators(
    {
      toggleMobileMenu
    },
    dispatch
  );

type EnhancedNavbarProps = StateProps & DispatchProps;

const enhance = compose<EnhancedNavbarProps, OuterProps>(
  setDisplayName('EnhancedNavbar'),
  firebaseConnect(),
  withFirestore,
  withRouter,
  connect<StateProps, DispatchProps, NavbarProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Navbar);
