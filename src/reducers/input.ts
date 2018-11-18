import { Color } from 'react-color';
import * as Action from 'actions/input';
import Tag from 'domain/Tag';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  inputtingContent: string;
  inputtingTag: string;
  tagList: Tag[];
  selectedColor: Color;
}

const initialState: State = {
  inputtingContent: '',
  inputtingTag: '',
  tagList: [{ title: '質問', isFeatured: true }],
  selectedColor: '#F4F4F4'
};

const reducer = reducerWithInitialState(initialState)
  .case(Action.onChangeContent, (state, payload) => {
    const { inputtingContent } = payload;
    if (inputtingContent !== undefined) {
      return {
        ...state,
        inputtingContent
      };
    }
    return state;
  })
  .case(Action.addContent, (state, payload) => {
    const { inputtingContent } = payload;
    if (inputtingContent !== undefined) {
      return {
        ...state,
        inputtingContent: (state.inputtingContent += payload.inputtingContent)
      };
    }
    return state;
  })
  .case(Action.onChangeColor, (state, payload) => {
    const { selectedColor } = payload;
    if (selectedColor !== undefined) {
      return {
        ...state,
        selectedColor
      };
    }
    return state;
  })
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

export default reducer;
