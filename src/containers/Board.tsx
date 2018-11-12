import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';

import {
  addNote,
  removeNote,
  updateNote,
  NoteActionPayload
} from 'actions/note';

import Board, { BoardProps } from 'components/Board';
import { CombinedState as State } from 'reducers/root';
import { Note, NoteMap } from 'domain/Note';

interface StateProps {
  notes: NoteMap;
}

interface DispatchProps {
  addNote?: (note: Note) => void;
  removeNote?: (noteId: string) => void;
  updateNote?: (noteId: string, note: Note) => void;
}

const mapStateToProps = (state: State) => ({
  notes: state.notes
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

export default connect<StateProps, DispatchProps, BoardProps>(
  mapStateToProps,
  mapDispatchToProps
)(Board);
