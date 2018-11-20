import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Navbar, { NavbarProps } from 'components/Navbar';
import { Dispatch, bindActionCreators } from 'redux';
import { Action } from 'typescript-fsa';
import { toggleInputForm, resetInput, InputActionPayload } from 'actions/input';
import { CombinedState as State } from 'reducers/root';

interface StateProps {
  isActive: boolean;
}

interface DispatchProps {
  toggleInputForm: () => void;
  resetInput: () => void;
}

const mapStateToProps = (state: State) => ({
  isActive: state.input.isActive
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<InputActionPayload>>
): DispatchProps =>
  bindActionCreators(
    {
      toggleInputForm,
      resetInput
    },
    dispatch
  );

type EnhancedNavbarProps = StateProps & DispatchProps;

const enhance = compose<EnhancedNavbarProps, {}>(
  setDisplayName('EnhancedNavbar'),
  connect<StateProps, DispatchProps, NavbarProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
);

export default enhance(Navbar);
