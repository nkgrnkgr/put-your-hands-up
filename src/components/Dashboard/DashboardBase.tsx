import * as React from 'react';
import EventList from 'containers/Dashboard/EventList';

export interface DashboardBaseProps {}

const dashboardBase: React.SFC<DashboardBaseProps> = ({}) => {
  console.log('called');
  return (
    <div className="columns">
      <div className="column">
        <EventList />
      </div>
      {/* <div className="column">saba</div> */}
    </div>
  );
};

export default dashboardBase;
