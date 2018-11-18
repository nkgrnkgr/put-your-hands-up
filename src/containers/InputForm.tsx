import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import InputForm, { InputFormProps } from 'components/InputForm';
import { CombinedState as State } from 'reducers/root';
import { reduxForm } from 'redux-form';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  addTag,
  removeTag,
  TagsActionPayload,
  onChangeTagInput
} from 'actions/tags';

import { onChangeColor, ColorActionPayload } from 'actions/color';
import { Color } from 'react-color';

interface StateProps {
  inputting: string;
  tags: Tag[];
  selectedColor: Color;
}

interface DispatchProps {
  onChangeTagInput: (inputting: string) => void;
  addTag: (title: string, isFeatured: boolean) => void;
  removeTag: (index: number) => void;
  onChangeColor: (selectedColor: Color) => void;
}

const mapStateToProps = (state: State) => ({
  inputting: state.tags.inputting,
  tags: state.tags.tagList,
  selectedColor: state.color.selectedColor
});

type Payload = TagsActionPayload & ColorActionPayload;

const mapDispatchToProps = (
  dispatch: Dispatch<Action<Payload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeTagInput: (inputting: string) => onChangeTagInput({ inputting }),
      addTag: (title: string, isFeatured: boolean) =>
        addTag({ title, isFeatured }),
      removeTag: (index: number) => removeTag({ index }),
      onChangeColor: (selectedColor: Color) => onChangeColor({ selectedColor })
    },
    dispatch
  );

type EnhancedInputFormProps = StateProps & DispatchProps;

const enhance = compose<EnhancedInputFormProps, {}>(
  setDisplayName('EnhancedInputForm'),
  reduxForm({ form: 'inputForm' }),
  connect<StateProps, DispatchProps, InputFormProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(InputForm);
