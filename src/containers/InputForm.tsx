import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import InputForm, { InputFormProps } from 'components/InputForm';
import { CombinedState as State } from 'reducers/root';
import { Color } from 'react-color';
import Tag from 'domain/Tag';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import {
  toggleDisplay,
  onChangeContent,
  addContent,
  addTag,
  removeTag,
  onChangeTagInput,
  onChangeColor,
  InputActionPayload,
  resetInput
} from 'actions/input';
import { withFirestore, firebaseConnect } from 'react-redux-firebase';

interface StateProps {
  isActive: boolean;
  inputtingTag: string;
  tags: Tag[];
  selectedColor: Color;
  inputtingContent: string;
  auth?: any;
}

interface DispatchProps {
  toggleDisplay: () => void;
  onChangeTagInput: (inputtingTag: string) => void;
  addContent: (inputtingTag: string) => void;
  addTag: (title: string, isFeatured: boolean) => void;
  removeTag: (index: number) => void;
  onChangeColor: (selectedColor: Color) => void;
  onChangeContent: (inputtingContent: string) => void;
  resetInput: () => void;
}

const mapStateToProps = (state: State) => ({
  isActive: state.input.isActive,
  inputtingTag: state.input.inputtingTag,
  tags: state.input.tagList,
  inputtingContent: state.input.inputtingContent,
  selectedColor: state.input.selectedColor,
  auth: state.firebase.auth
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<InputActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      resetInput,
      toggleDisplay,
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
  firebaseConnect(),
  withFirestore,
  connect<StateProps, DispatchProps, InputFormProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(InputForm);
