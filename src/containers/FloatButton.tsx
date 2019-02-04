import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import FloatButton, { FloatButtonProps } from 'components/FloatButton';
import { toggleDisplay, InputActionPayload } from 'actions/input';

interface DispatchProps {
  toggleDisplay: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<InputActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleDisplay
    },
    dispatch
  );

const enhance = compose<{}, {}>(
  setDisplayName('EnhancedFloadButton'),
  connect<{}, DispatchProps, FloatButtonProps>(
    undefined,
    mapDispatchToProps
  ),
  pure
);

export default enhance(FloatButton);
