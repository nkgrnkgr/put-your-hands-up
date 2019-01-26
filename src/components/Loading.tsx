import * as React from 'react';

export interface LoadingProps {}

const loading: React.SFC<LoadingProps> = () => {
  return (
    <span>
      Loading...
      <span className="icon is-large">
        <i className="fas fa-spinner fa-spin" />
      </span>
    </span>
  );
};

export default loading;
