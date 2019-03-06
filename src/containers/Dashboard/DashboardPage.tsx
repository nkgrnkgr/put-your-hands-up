import { connect } from 'react-redux';
import { compose, pure, setDisplayName } from 'recompose';
import { CombinedState as State } from 'reducers/root';
import { firebaseConnect, withFirestore } from 'react-redux-firebase';
import DashboardPage, {
  DashboardPageProps
} from 'components/Dashboard/DashboardPage';
import { withRouter } from 'react-router';

interface StateProps {}

const mapStateToProps = (state: State) => ({});

const enhance = compose<StateProps, {}>(
  setDisplayName('EnhancedDashboard'),
  firebaseConnect(),
  withFirestore,
  withRouter,
  connect<StateProps, {}, DashboardPageProps>(mapStateToProps),
  pure
);

export default enhance(DashboardPage);
