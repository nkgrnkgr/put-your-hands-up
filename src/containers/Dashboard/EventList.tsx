import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import EventList, { EventListProps } from 'components/Dashboard/EventList';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { addEvent, DashboardActionPayload } from 'actions/dashboard';
import { Event } from 'domain/Event';
import { findUser } from 'domain/Anonymous';

interface StateProps {
  auth: Auth;
  users: FirebaseUser[];
  events: Event[];
}

interface FirebaseProps {
  firestore: Firestore;
}

interface DispatchProps {
  addEvent: (event: Event) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<DashboardActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      addEvent: (event: Event) => addEvent({ event })
    },
    dispatch
  );

type EnhancedProps = StateProps & DispatchProps & FirebaseProps;

type FireStoreUsers = Firestore & { ordered: { users: FirebaseUser[] } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  users: (state.firestore as FireStoreUsers).ordered.users,
  events: state.dashboard.events
});

const enhance = compose<EnhancedProps, {}>(
  setDisplayName('EnhancedEventList'),
  connect<StateProps, DispatchProps, EventListProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFirestore,
  lifecycle<EnhancedProps, {}, {}>({
    async componentDidMount() {
      const { firestore, auth, addEvent } = this.props;

      let user: FirebaseUser | null = null;
      if (auth.isAnonymous) {
        user = findUser(auth.uid);
      } else {
        const docs = await firestore.get({
          collection: 'users',
          doc: auth.uid
        });
        user = docs.data();
      }
      if (
        user &&
        user.eventIdsParticipated &&
        user.eventIdsParticipated.length > 0
      ) {
        user.eventIdsParticipated.map(async (eventId, index) => {
          const docsForEvent = await firestore.get({
            collection: 'events',
            doc: eventId
          });

          const event: Event = docsForEvent.data();
          addEvent(event);
        });
      }
    }
  }),
  pure
);

export default enhance(EventList);
