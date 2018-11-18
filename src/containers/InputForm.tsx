import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import InputForm, { InputFormProps } from 'components/InputForm';
import { CombinedState as State } from 'reducers/root';
import { Color } from 'react-color';
import { reduxForm } from 'redux-form';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  onChangeContent,
  addContent,
  addTag,
  removeTag,
  onChangeTagInput,
  onChangeColor,
  InputActionPayload
} from 'actions/input';

interface StateProps {
  inputtingTag: string;
  tags: Tag[];
  selectedColor: Color;
  inputtingContent: string;
}

interface DispatchProps {
  onChangeTagInput: (inputtingTag: string) => void;
  addContent: (inputtingTag: string) => void;
  addTag: (title: string, isFeatured: boolean) => void;
  removeTag: (index: number) => void;
  onChangeColor: (selectedColor: Color) => void;
  onChangeContent: (inputtingContent: string) => void;
}

const mapStateToProps = (state: State) => ({
  inputtingTag: state.input.inputtingTag,
  tags: state.input.tagList,
  selectedColor: state.input.selectedColor,
  inputtingContent: state.input.inputtingContent
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<InputActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      onChangeContent: (inputtingContent: string) =>
        onChangeContent({ inputtingContent }),
      addContent: (inputtingContent: string) =>
        addContent({ inputtingContent }),
      onChangeTagInput: (inputtingTag: string) =>
        onChangeTagInput({ inputtingTag }),
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
