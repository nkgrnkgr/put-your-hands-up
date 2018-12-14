import { connect } from 'react-redux';
import { compose } from 'recompose';

import CommentsBoard, { CommentsBoardProps } from 'components/CommentsBoard';
import { CombinedState as State } from 'reducers/root';
import { Note, NoteMap } from 'domain/Note';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

interface StateProps {
  notes: NoteMap;
}

interface DispatchProps {
  addNote?: (note: Note) => void;
  removeNote?: (noteId: string) => void;
  updateNote?: (noteId: string, note: Note) => void;
}

const mapStateToProps = (state: State) => ({
  notes: state.firestore.ordered.notes
});

const enhance = compose(
  firestoreConnect(['notes']),
  withFirestore,
  connect<StateProps, DispatchProps, CommentsBoardProps>(mapStateToProps)
);

export default enhance(CommentsBoard);
