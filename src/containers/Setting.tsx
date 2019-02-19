import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import Setting, { SettingsProps } from 'components/Setting';
import { CombinedState as State } from 'reducers/root';

interface StateProps {
  auth: Auth;
}

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth
});

const enhance = compose<StateProps, {}>(
  setDisplayName('EnhancedSetting'),
  connect<StateProps, {}, SettingsProps>(mapStateToProps),
  pure
);

export default enhance(Setting);
