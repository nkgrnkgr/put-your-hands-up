import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import FloatButton, { FloatButtonProps } from 'components/FloatButton';
import { toggleDisplay } from 'actions/commentFormModal';
import { changeStateCommentForm, CommentActionPayload } from 'actions/comment';

interface DispatchProps {
  toggleDisplay: () => void;
  changeStateCommentForm: (shouldOpen: boolean) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<CommentActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay,
      changeStateCommentForm: (shouldOpen: boolean) =>
        changeStateCommentForm({ shouldOpen })
    },
    dispatch
  );

const enhance = compose<{}, {}>(
  setDisplayName('EnhancedFloadButton'),
  connect<{}, DispatchProps, FloatButtonProps>(
    undefined,
    mapDispatchToProps
  ),
  pure
);

export default enhance(FloatButton);
