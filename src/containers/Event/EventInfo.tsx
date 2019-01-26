import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import EventInfo, { EventInfoProps } from 'components/Event/EventInfo';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { RouteComponentProps } from 'react-router';
import { Events } from 'domain/Event';

interface StateProps {
  auth: Auth;
  events: Events;
}

interface Params {
  eventurl: string;
}

interface ReactRouterProps extends RouteComponentProps<Params> {}

interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreEvents = Firestore & { ordered: { events: Events } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  events: (state.firestore as FirestoreEvents).ordered.events
});

const enhance = compose<EnhancedProps, ReactRouterProps>(
  setDisplayName('EnhancedEventInfo'),
  withFirestore,
  connect<StateProps, {}, EventInfoProps>(mapStateToProps),
  lifecycle<EnhancedProps & ReactRouterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.get({
        collection: 'events',
        where: [['id', '==', this.props.match.params.eventurl]]
      });
    }
  }),
  pure
);

export default enhance(EventInfo);
