import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import InputForm, { InputFormProps } from 'components/InputForm';
import { CombinedState as State } from 'reducers/root';
import { NoteMap } from 'domain/Note';
import { reduxForm } from 'redux-form';

interface StateProps {
  notes: NoteMap;
}

const mapStateToProps = (state: State) => ({
  notes: state.notes
});

type EnhancedInputFormProps = StateProps;

const enhance = compose<EnhancedInputFormProps, {}>(
  setDisplayName('EnhancedInputForm'),
  reduxForm({ form: 'inputForm' }),
  connect<StateProps, InputFormProps>(mapStateToProps),
  pure
);

export default enhance(InputForm);
