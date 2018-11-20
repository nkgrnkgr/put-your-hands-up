import * as React from 'react';
import 'bulma/css/bulma.css';
import 'css/animation.css';
import Board from 'containers/Board';
import InputForm from 'containers/InputForm';
import Navbar from 'containers/Navbar';

const app: React.SFC = () => (
  <section className="section">
    <Navbar />
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
