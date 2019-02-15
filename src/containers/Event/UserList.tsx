import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import UserList, { UserListProps } from 'components/Event/UserList';
import { CombinedState as State } from 'reducers/root';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';
import { withFirestore } from 'react-redux-firebase';

interface StateProps {
  users: FirebaseUser[];
}

interface FirebaseProps {
  firestore: Firestore;
}

interface OuterProps {
  event: Event;
}

type EnhancedProps = StateProps & FirebaseProps;

type FireStoreUsers = Firestore & { ordered: { users: FirebaseUser[] } };

const mapStateToProps = (state: State) => ({
  users: (state.firestore as FireStoreUsers).ordered.users
});

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedUserList'),
  connect<StateProps, {}, UserListProps>(mapStateToProps),
  withFirestore,
  lifecycle<EnhancedProps & OuterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.setListener({
        collection: 'users',
        where: [['eventIdsParticipated', 'array-contains', this.props.event.id]]
      });
    }
  }),
  pure
);

export default enhance(UserList);
