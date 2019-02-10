import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import CommentForm, { CommentFormProps } from 'components/Event/CommentForm';
import { CombinedState as State } from 'reducers/root';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  onChangeComment,
  addComment,
  addTag,
  removeTag,
  onChangeTagTitle,
  resetCommentInfo,
  CommentActionPayload
} from 'actions/comment';
import { Event } from 'domain/Event';
import { withFirestore } from 'react-redux-firebase';

interface StateProps {
  inputtingComment: string;
  inputtingTags: Tag[];
  inputtingTagTitle: string;
  selectedTabIndex: number;
  auth: Auth;
}

interface OuterProps {
  event: Event;
}

interface DispatchProps {
  onChangeComment: (comment: string) => void;
  addComment: (comment: string) => void;
  addTag: (tag: Tag) => void;
  onChangeTagTitle: (tagTitle: string) => void;
  removeTag: (index: number) => void;
  resetCommentInfo: () => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  inputtingComment: state.comment.inputtingComment,
  inputtingTags: state.comment.inputtingTags,
  inputtingTagTitle: state.comment.inputtingTagTitle,
  selectedTabIndex: state.application.selectedTabIndex
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<CommentActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeComment: (comment: string) => onChangeComment({ comment }),
      addComment: (comment: string) => addComment({ comment }),
      addTag: (tag: Tag) => addTag({ tag }),
      removeTag: (tagIndex: number) => removeTag({ tagIndex }),
      onChangeTagTitle: (tagTitle: string) => onChangeTagTitle({ tagTitle }),
      resetCommentInfo: () => resetCommentInfo()
    },
    dispatch
  );

const enhance = compose<EnhancedProps, OuterProps>(
  setDisplayName('EnhancedSearchWrapper'),
  withFirestore,
  connect<StateProps, DispatchProps, CommentFormProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(CommentForm);
