import * as React from 'react';
import EventList from 'containers/Dashboard/EventList';

export interface DashboardBaseProps {}

const dashboardBase: React.SFC<DashboardBaseProps> = ({}) => {
  return (
    <div className="columns is-centered">
      <div className="column is-three-fifths">
        <EventList />
        <div style={{ height: '240px' }} />
      </div>
    </div>
  );
};

export default dashboardBase;
