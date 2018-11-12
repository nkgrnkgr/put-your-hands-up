import * as React from 'react';
import 'bulma/css/bulma.css';
import 'css/animation.css';
// import StickyNote from 'components/StickyNote';
import InputForm from 'components/InputForm';
// import { Color } from 'domain/Color';
import Board from 'containers/Board';

const app: React.SFC = () => (
  <section className="section">
    <nav className="navbar is-fixed-top">
      <div className="container">navbar</div>
    </nav>
    <div className="container">
      <Board />
      {/* <StickyNote
          user={testData[0].user}
          image={testData[0].image}
          note={testData[0].note}
        /> */}
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
