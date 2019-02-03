import { connect } from 'react-redux';
import { compose, setDisplayName, pure, lifecycle } from 'recompose';
import CommentsBoard, {
  CommentsBoardProps
} from 'components/Event/CommentsBoard';
import { CombinedState as State } from 'reducers/root';
import { Note } from 'domain/Note';
import { withFirestore } from 'react-redux-firebase';
import { Event } from 'domain/Event';
import Tag from 'domain/Tag';

interface StateProps {
  auth: Auth;
  notes: Note[];
  selectedTabIndex: number;
  query: string;
  tags: Tag[];
}

interface OuterProps {
  event: Event;
}
interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreNotes = Firestore & { ordered: { notes: Note[] } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  notes: (state.firestore as FirestoreNotes).ordered.notes,
  selectedTabIndex: state.application.selectedTabIndex,
  query: state.search.query,
  tags: state.search.tags
});

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedBoard'),
  withFirestore,
  connect<StateProps, {}, CommentsBoardProps>(mapStateToProps),
  lifecycle<EnhancedProps & OuterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.setListener({
        collection: 'notes',
        where: [['eventId', '==', this.props.event.id]]
      });
    }
  }),
  pure
);

export default enhance(CommentsBoard);
