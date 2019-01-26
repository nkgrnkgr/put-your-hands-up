import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import InputForm, { InputFormProps } from 'components/Organizer/InputForm';
import { withFirestore, firebaseConnect } from 'react-redux-firebase';
import { CombinedState as State } from 'reducers/root';
import { Event } from 'domain/Event';
import { withRouter } from 'react-router';

interface StateProps {
  auth: Auth;
}
interface OuterProps {
  event?: Event;
  handleSubmit: (values: unknown) => void;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose<StateProps, OuterProps>(
  setDisplayName('EnhancedInputForm'),
  firebaseConnect(),
  withFirestore,
  withRouter,
  connect<StateProps, {}, InputFormProps>(mapStateToProps),
  pure
);

export default enhance(InputForm);
