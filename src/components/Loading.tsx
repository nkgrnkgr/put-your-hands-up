import * as React from 'react';

export interface LoadingProps {}

const loading: React.SFC<LoadingProps> = () => {
  return (
    <div
      className="pageloader is-active"
      style={{ backgroundColor: '#FDF5F7', color: '#B0999F' }}
    >
      <span className="title" style={{ color: '#B0999F' }}>
        Loading...
        <span className="icon is-large">
          <i className="fas fa-spinner fa-spin" />
        </span>
      </span>
    </div>
    // <span>
    //   Loading...
    //   <span className="icon is-large">
    //     <i className="fas fa-spinner fa-spin" />
    //   </span>
    // </span>
  );
};

export default loading;
