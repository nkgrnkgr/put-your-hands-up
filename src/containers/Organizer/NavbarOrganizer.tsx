import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import NavbarOrganizer, {
  NavbarOrganizerProps
} from 'components/Organizer/NavbarOrganizer';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { toggleMobileMenu } from 'actions/mobileMenu';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect } from 'react-redux-firebase';

interface StateProps {
  auth: Auth;
}

interface DispatchProps {
  toggleMobileMenu: () => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  isActiveMobileMenu: state.application.isActiveMobileMenu
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<unknown>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleMobileMenu
    },
    dispatch
  );

type EnhancedNavbarProps = StateProps & DispatchProps;

const enhance = compose<EnhancedNavbarProps, {}>(
  setDisplayName('EnhancedOrganizer'),
  firebaseConnect(),
  connect<StateProps, DispatchProps, NavbarOrganizerProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(NavbarOrganizer);
