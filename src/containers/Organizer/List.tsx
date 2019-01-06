import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import List, { ListProps } from 'components/Organizer/List';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { EventMap } from 'domain/Event';

interface StateProps {
  auth: any;
  events: EventMap;
}

interface FirebaseProps {
  firestore: any;
}

type EnhancedProps = StateProps & FirebaseProps;

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  events: state.firestore.ordered.events
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
