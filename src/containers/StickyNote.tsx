import { connect } from 'react-redux';
import { compose, setDisplayName, pure } from 'recompose';
import StickyNote, { StickyNoteProps } from 'components/StickyNote';
import { CombinedState as State } from 'reducers/root';
import { Note } from 'domain/Note';
import { withFirestore } from 'react-redux-firebase';

interface OuterProps {
  note: Note;
}

interface StateProps {
  auth: any;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose<StateProps, OuterProps>(
  setDisplayName('EnhancedBoard'),
  withFirestore,
  connect<StateProps, {}, StickyNoteProps>(mapStateToProps),
  pure
);

export default enhance(StickyNote);
