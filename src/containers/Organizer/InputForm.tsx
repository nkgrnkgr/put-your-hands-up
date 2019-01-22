import { compose, pure, setDisplayName } from 'recompose';
import InputForm from 'components/Organizer/InputForm';
import { withFirestore, firebaseConnect } from 'react-redux-firebase';
import { Event } from 'domain/Event';
import { withRouter } from 'react-router';

interface OuterProps {
  event?: Event;
  handleSubmit: (values: unknown) => void;
}

const enhance = compose<{}, OuterProps>(
  setDisplayName('EnhancedInputForm'),
  firebaseConnect(),
  withFirestore,
  withRouter,
  pure
);

export default enhance(InputForm);
