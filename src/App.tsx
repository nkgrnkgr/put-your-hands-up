import * as React from 'react';
import 'bulma/css/bulma.css';
import 'css/animation.css';
import InputForm from 'components/InputForm';
import Board from 'containers/Board';

const app: React.SFC = () => (
  <section className="section">
    <nav className="navbar is-fixed-top">
      <div className="container">navbar</div>
    </nav>
    <div className="container">
      <Board />
    </div>
    <div className="container">
      <nav className="navbar is-fixed-bottom">
        <div className="container">
          <InputForm />
        </div>
      </nav>
    </div>
  </section>
);

export default app;
