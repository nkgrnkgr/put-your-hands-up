import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import EventWrapper, { EventWrapperProps } from 'components/Event/EventWrapper';
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
  setDisplayName('EnhancedEventWrapper'),
  withFirestore,
  connect<StateProps, {}, EventWrapperProps>(mapStateToProps),
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

export default enhance(EventWrapper);
