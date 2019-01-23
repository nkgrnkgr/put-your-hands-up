import { connect } from 'react-redux';
import { compose, setDisplayName, pure } from 'recompose';

import CommentsBoard, { CommentsBoardProps } from 'components/CommentsBoard';
import { CombinedState as State } from 'reducers/root';
import { NoteMap } from 'domain/Note';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

interface StateProps {
  notes: NoteMap;
}

type FirestoreNotes = Firestore & { ordered: { notes: NoteMap } };

const mapStateToProps = (state: State) => ({
  notes: (state.firestore as FirestoreNotes).ordered.notes
});

const enhance = compose(
  setDisplayName('EnhancedBoard'),
  firestoreConnect(['notes']),
  withFirestore,
  connect<StateProps, CommentsBoardProps>(mapStateToProps),
  pure
);

export default enhance(CommentsBoard);
