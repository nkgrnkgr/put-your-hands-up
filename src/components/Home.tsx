import * as React from 'react';

export interface HomeProps {}

const home: React.SFC<HomeProps> = () => {
  return (
    <div className="container">
      <p>Home</p>
    </div>
  );
};

export default home;
