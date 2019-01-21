import { compose, pure, setDisplayName } from 'recompose';
import InputForm from 'components/Organizer/InputForm';
import { withFirestore } from 'react-redux-firebase';
import { Event } from 'domain/Event';

interface OuterProps {
  event?: Event;
}

const enhance = compose<{}, OuterProps>(
  setDisplayName('EnhancedInputForm'),
  withFirestore,
  pure
);

export default enhance(InputForm);
