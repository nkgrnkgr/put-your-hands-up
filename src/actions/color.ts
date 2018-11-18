import { Color } from 'react-color';
import { actionCreatorFactory } from 'typescript-fsa';

export interface ColorActionPayload {
  selectedColor?: Color;
}

const actionCreater = actionCreatorFactory();

export const onChangeColor = actionCreater<ColorActionPayload>(
  'COLOR_ON_CHANGE'
);
