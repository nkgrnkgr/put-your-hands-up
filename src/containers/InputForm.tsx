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
import { onChangeContent, ContentActionPayload } from 'actions/content';
import { Color } from 'react-color';

interface StateProps {
  inputtingTag: string;
  tags: Tag[];
  selectedColor: Color;
  inputtingContent: string;
}

interface DispatchProps {
  onChangeTagInput: (inputtingTag: string) => void;
  addTag: (title: string, isFeatured: boolean) => void;
  removeTag: (index: number) => void;
  onChangeColor: (selectedColor: Color) => void;
  onChangeContent: (inputtingContent: string) => void;
}

const mapStateToProps = (state: State) => ({
  inputtingTag: state.tags.inputtingTag,
  tags: state.tags.tagList,
  selectedColor: state.color.selectedColor,
  inputtingContent: state.content.inputtingContent
});

type Payload = TagsActionPayload & ColorActionPayload & ContentActionPayload;

const mapDispatchToProps = (
  dispatch: Dispatch<Action<Payload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeTagInput: (inputtingTag: string) =>
        onChangeTagInput({ inputtingTag }),
      addTag: (title: string, isFeatured: boolean) =>
        addTag({ title, isFeatured }),
      removeTag: (index: number) => removeTag({ index }),
      onChangeColor: (selectedColor: Color) => onChangeColor({ selectedColor }),
      onChangeContent: (inputtingContent: string) =>
        onChangeContent({ inputtingContent })
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
