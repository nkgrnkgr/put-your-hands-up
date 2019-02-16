import * as React from 'react';

export interface FooterProps {}

const footer: React.SFC<FooterProps> = () => {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column">First column</div>
            <div className="column">Second column</div>
            <div className="column">Third column</div>
            <div className="column">Forth column</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default footer;
