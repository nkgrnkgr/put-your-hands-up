import { connect } from 'react-redux';
import { compose, pure, setDisplayName, lifecycle } from 'recompose';
import Edit, { EditProps } from 'components/Organizer/Edit';
import { CombinedState as State } from 'reducers/root';
import { withFirestore } from 'react-redux-firebase';
import { RouteComponentProps } from 'react-router';
import { EventMap } from 'domain/Event';

interface StateProps {
  auth: any;
  events: EventMap;
}

interface Params {
  id: string;
}

interface ReactRouterProps extends RouteComponentProps<Params> {}

interface FirebaseProps {
  firestore: any;
}

type EnhancedProps = StateProps & FirebaseProps;

const mapStateToProps = (state: State) => ({
  auth: state.firebase.auth,
  events: state.firestore.ordered.events
});

const enhance = compose<EnhancedProps, ReactRouterProps>(
  setDisplayName('EnhancedList'),
  withFirestore,
  connect<StateProps, {}, EditProps>(mapStateToProps),
  lifecycle<EnhancedProps & ReactRouterProps, {}, {}>({
    componentDidMount() {
      console.log(this.props);
      this.props.firestore.get({
        collection: 'events',
        where: [
          ['organizerUid', '==', this.props.auth.uid],
          ['id', '==', this.props.match.params.id]
        ]
      });
    }
  }),
  pure
);

export default enhance(Edit);
