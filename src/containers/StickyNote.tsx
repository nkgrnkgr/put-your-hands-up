import { connect } from 'react-redux';
import { compose, setDisplayName, pure } from 'recompose';
import StickyNote, { StickyNoteProps } from 'components/StickyNote';
import { CombinedState as State } from 'reducers/root';
import { Note } from 'domain/Note';
import { withFirestore } from 'react-redux-firebase';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  toggleDisplay,
  ConfirmModalActionPayload,
  setOkAction,
  setNgAction
} from 'actions/confirmModal';

import { addTag } from 'actions/search';
import Tag from 'domain/Tag';

interface OuterProps {
  note: Note;
}

interface StateProps {
  auth: Auth;
}
interface DispatchProps {
  toggleDisplay: () => void;
  setOkAction: (action: () => void) => void;
  setNgAction: (action: () => void) => void;
  addTag: (tag: Tag) => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<ConfirmModalActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay,
      setOkAction: (action: () => void) => setOkAction({ action }),
      setNgAction: (action: () => void) => setNgAction({ action }),
      addTag: (tag: Tag) => addTag({ tag })
    },
    dispatch
  );

type EnhancedStickyNoteProps = StateProps & DispatchProps;

const enhance = compose<EnhancedStickyNoteProps, OuterProps>(
  setDisplayName('EnhancedStickyNote'),
  withFirestore,
  connect<StateProps, DispatchProps, StickyNoteProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(StickyNote);
