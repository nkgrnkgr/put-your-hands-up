import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { compose } from 'recompose';

import {
  addNote,
  removeNote,
  updateNote,
  NoteActionPayload
} from 'actions/note';

import CommentsBoard, { BoardProps } from 'components/CommentsBoard';
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
  notes: state.notes,
  members: state.firestore.ordered.members
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<NoteActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      addNote: (note: Note) => addNote({ note }),
      removeNote: (noteId: string) => removeNote({ noteId }),
      updateNote: (noteId: string, note: Note) => updateNote({ noteId, note })
    },
    dispatch
  );

const enhance = compose(
  firestoreConnect(['members']),
  withFirestore,
  connect<StateProps, DispatchProps, BoardProps>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(CommentsBoard);
