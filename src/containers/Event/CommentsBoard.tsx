import { connect } from 'react-redux';
import { compose, setDisplayName, pure, lifecycle } from 'recompose';
import CommentsBoard, {
  CommentsBoardProps
} from 'components/Event/CommentsBoard';
import { CombinedState as State } from 'reducers/root';
import { NoteMap } from 'domain/Note';
import { withFirestore } from 'react-redux-firebase';
import { Event } from 'domain/Event';

interface StateProps {
  auth: Auth;
  notes: NoteMap;
}

interface OuterProps {
  event: Event;
}
interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreNotes = Firestore & { ordered: { notes: NoteMap } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  notes: (state.firestore as FirestoreNotes).ordered.notes
});

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedBoard'),
  withFirestore,
  connect<StateProps, {}, CommentsBoardProps>(mapStateToProps),
  lifecycle<EnhancedProps & OuterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.setListener({
        collection: 'notes',
        where: [['event.eventId', '==', this.props.event.id]]
      });
    }
  }),
  pure
);

export default enhance(CommentsBoard);
