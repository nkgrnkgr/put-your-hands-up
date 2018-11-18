import { Color } from 'react-color';
import * as Action from 'actions/color';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
  selectedColor: Color;
}

const initialState: State = {
  selectedColor: '#F4F4F4'
};

const tagsReducer = reducerWithInitialState(initialState).case(
  Action.onChangeColor,
  (state, payload) => {
    const { selectedColor } = payload;
    if (selectedColor !== undefined) {
      return {
        ...state,
        selectedColor
      };
    }
    return state;
  }
);
export default tagsReducer;
