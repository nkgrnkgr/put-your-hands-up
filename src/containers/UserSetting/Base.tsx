import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Base, { BaseProps } from 'components/UserSetting/Base';
import { CombinedState as State } from 'reducers/root';

interface StateProps {
  auth: Auth;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  name: state.userSetting.inputtingName,
  hex: state.userSetting.selectingColorHex
});

const enhance = compose<StateProps, {}>(
  setDisplayName('EnhancedSetting'),
  connect<StateProps, {}, BaseProps>(mapStateToProps),
  pure
);

export default enhance(Base);
