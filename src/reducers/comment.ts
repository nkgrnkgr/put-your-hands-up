import Tag from 'domain/Tag';
import * as Action from 'actions/comment';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  inputtingComment: string;
  inputtingTags: Tag[];
  inputtingTagTitle: string;
}

const initialState: State = {
  inputtingComment: '',
  inputtingTags: [{ title: '質問', isFeatured: true }],
  inputtingTagTitle: ''
};

const reducer = reducerWithInitialState(initialState)
  .case(Action.onChangeComment, (state, payload) => {
    const { comment } = payload;
    if (comment !== undefined) {
      return {
        ...state,
        inputtingComment: comment
      };
    }
    return state;
  })
  .case(Action.addComment, (state, payload) => {
    const { comment } = payload;
    if (comment !== undefined) {
      return {
        ...state,
        inputtingComment: state.inputtingComment + comment
      };
    }
    return state;
  })
  .case(Action.addTag, (state, payload) => {
    const { tag } = payload;
    if (tag === undefined) {
      return state;
    }
    if (existsTagAlready(state.inputtingTags, tag)) {
      return state;
    }
    return {
      ...state,
      inputtingTags: [...state.inputtingTags, tag],
      inputtingTagTitle: ''
    };
  })
  .case(Action.removeTag, (state, payload) => {
    const { tagIndex } = payload;
    if (tagIndex === undefined) {
      return state;
    }
    if (state.inputtingComment[tagIndex] === null) {
      return state;
    }
    const t = [...state.inputtingTags];
    t.splice(tagIndex, 1);
    return {
      ...state,
      inputtingTags: t
    };
  })
  .case(Action.onChangeTagTitle, (state, payload) => {
    const { tagTitle } = payload;
    if (tagTitle !== undefined) {
      return {
        ...state,
        inputtingTagTitle: tagTitle
      };
    }
    return state;
  })
  .case(Action.resetCommentInfo, state => {
    const { inputtingComment, inputtingTagTitle, inputtingTags } = initialState;
    return {
      ...state,
      inputtingComment,
      inputtingTagTitle,
      inputtingTags
    };
  });

const existsTagAlready = (tags: Tag[], tag: Tag): boolean => {
  return tags.some(t => t.title === tag.title);
};

export default reducer;
