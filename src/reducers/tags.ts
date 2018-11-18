import * as Action from 'actions/tags';
import Tag from 'domain/Tag';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  inputtingTag: string;
  tagList: Tag[];
}

const initialState: State = {
  inputtingTag: '',
  tagList: [{ title: '質問', isFeatured: true }]
};

const tagsReducer = reducerWithInitialState(initialState)
  .case(Action.onChangeTagInput, (state, payload) => {
    const { inputtingTag } = payload;
    if (inputtingTag !== undefined) {
      return {
        ...state,
        inputtingTag
      };
    }
    return state;
  })
  .case(Action.addTag, (state, payload) => {
    const { title, isFeatured } = payload;
    if (title && isFeatured !== undefined) {
      return {
        ...state,
        tagList: [...state.tagList, { title, isFeatured }]
      };
    }
    return state;
  })
  .case(Action.removeTag, (state, payload) => {
    const { index } = payload;
    if (index !== undefined) {
      const t = [...state.tagList];
      t.splice(index, 1);
      return {
        ...state,
        tagList: t
      };
    }
    return state;
  });

export default tagsReducer;
