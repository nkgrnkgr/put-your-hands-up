import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect, withFirestore } from 'react-redux-firebase';
import OrganizerPage, {
  OrganizerPageProps
} from 'components/Organizer/OrganizerPage';

interface StateProps {
  auth: Auth;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose<StateProps, {}>(
  setDisplayName('EnhancedOrganizerPage'),
  firebaseConnect(),
  withFirestore,
  connect<StateProps, {}, OrganizerPageProps>(mapStateToProps),
  pure
);

export default enhance(OrganizerPage);
