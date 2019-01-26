import { connect } from 'react-redux';
import { compose, setDisplayName, pure, lifecycle } from 'recompose';
import CommentsBoard, { CommentsBoardProps } from 'components/CommentsBoard';
import { CombinedState as State } from 'reducers/root';
import { NoteMap } from 'domain/Note';
import { withFirestore } from 'react-redux-firebase';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  auth: Auth;
  notes: NoteMap;
}
interface Params {
  eventurl: string;
}

interface ReactRouterProps extends RouteComponentProps<Params> {}

interface FirebaseProps {
  firestore: Firestore;
}

type EnhancedProps = StateProps & FirebaseProps;

type FirestoreNotes = Firestore & { ordered: { notes: NoteMap } };

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  notes: (state.firestore as FirestoreNotes).ordered.notes
});

const enhance = compose<EnhancedProps, ReactRouterProps>(
  setDisplayName('EnhancedBoard'),
  withFirestore,
  connect<StateProps, {}, CommentsBoardProps>(mapStateToProps),
  lifecycle<EnhancedProps & ReactRouterProps, {}, {}>({
    componentDidMount() {
      this.props.firestore.setListener({
        collection: 'notes',
        where: [['id', '==', this.props.match.params.eventurl]]
      });
    }
  }),
  pure
);

export default enhance(CommentsBoard);
