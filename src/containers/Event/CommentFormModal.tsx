import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import CommentFormModal, {
  CommentFormModalProps
} from 'components/Event/CommentFormModal';
import { CombinedState as State } from 'reducers/root';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { toggleDisplay } from 'actions/commentFormModal';
import { Event } from 'domain/Event';

interface StateProps {
  isActive: boolean;
}

interface OuterProps {
  event: Event;
}

interface DispatchProps {
  toggleDisplay: () => void;
}

const mapStateToProps = (state: State) => ({
  isActive: state.application.isActiveCommetFormModal
});

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay
    },
    dispatch
  );

type EnhancedProps = StateProps & DispatchProps;

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedCommetFormModal'),
  connect<StateProps, DispatchProps, CommentFormModalProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(CommentFormModal);
