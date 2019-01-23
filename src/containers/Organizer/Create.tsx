import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Create, { CreateProps } from 'components/Organizer/Create';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';

interface StateProps {
  auth: Auth;
}

interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedCreate'),
  withFirestore,
  connect<StateProps, {}, CreateProps>(mapStateToProps),
  pure
);

export default enhance(Create);
