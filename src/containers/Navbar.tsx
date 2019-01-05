import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Navbar, { NavbarProps } from 'components/Navbar';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { toggleDisplay, InputActionPayload } from 'actions/input';
import { toggleMobileMenu } from 'actions/mobileMenu';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect } from 'react-redux-firebase';

interface StateProps {
  auth: any;
}

interface DispatchProps {
  toggleDisplay: () => void;
  toggleMobileMenu: () => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  isActiveMobileMenu: state.application.isActiveMobileMenu
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<InputActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay,
      toggleMobileMenu
    },
    dispatch
  );

type EnhancedNavbarProps = StateProps & DispatchProps;

const enhance = compose<EnhancedNavbarProps, {}>(
  setDisplayName('EnhancedNavbar'),
  firebaseConnect(),
  connect<StateProps, DispatchProps, NavbarProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Navbar);
