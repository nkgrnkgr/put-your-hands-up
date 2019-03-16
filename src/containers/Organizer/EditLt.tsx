import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import EditLt, { EditLtProps } from 'components/Organizer/EditLt';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { RouteComponentProps } from 'react-router';
import { Events } from 'domain/Event';

interface StateProps {
  events: Events;
}

interface Params {
  eventId: string;
  index: string;
}

interface ReactRouterProps extends RouteComponentProps<Params> {}

interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreEvents = Firestore & { ordered: { events: Events } };

const mapStateToProps = (state: State) => ({
  events: (state.firestore as FirestoreEvents).ordered.events
});

const enhance = compose<EnhancedProps, ReactRouterProps>(
  setDisplayName('EnhancedEdit'),
  withFirestore,
  connect<StateProps, {}, EditLtProps>(mapStateToProps),
  lifecycle<EnhancedProps & ReactRouterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.get({
        collection: 'events',
        where: [['id', '==', this.props.match.params.eventId]]
      });
    }
  }),
  pure
);

export default enhance(EditLt);
