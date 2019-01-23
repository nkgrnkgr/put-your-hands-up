import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import Edit, { EditProps } from 'components/Organizer/Edit';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { RouteComponentProps } from 'react-router';
import { EventMap } from 'domain/Event';

interface StateProps {
  auth: Auth;
  events: EventMap;
}

interface Params {
  id: string;
}

interface ReactRouterProps extends RouteComponentProps<Params> {}

interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreEvents = Firestore & { ordered: { events: EventMap } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  events: (state.firestore as FirestoreEvents).ordered.events
});

const enhance = compose<EnhancedProps, ReactRouterProps>(
  setDisplayName('EnhancedList'),
  withFirestore,
  connect<StateProps, {}, EditProps>(mapStateToProps),
  lifecycle<EnhancedProps & ReactRouterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.get({
        collection: 'events',
        where: [
          ['organizerUid', '==', this.props.auth.uid],
          ['id', '==', this.props.match.params.id]
        ]
      });
    }
  }),
  pure
);

export default enhance(Edit);
