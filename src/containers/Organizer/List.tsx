import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import List, { ListProps } from 'components/Organizer/List';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { Event } from 'domain/Event';

interface StateProps {
  auth: Auth;
  events: Event[];
}

interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreEvents = Firestore & { ordered: { events: Event[] } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  events: (state.firestore as FirestoreEvents).ordered.events
});

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedList'),
  withFirestore,
  connect<StateProps, {}, ListProps>(mapStateToProps),
  lifecycle<EnhancedProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.setListener({
        collection: 'events',
        where: ['organizerUid', '==', this.props.auth.uid]
      });
    }
  }),
  pure
);

export default enhance(List);
