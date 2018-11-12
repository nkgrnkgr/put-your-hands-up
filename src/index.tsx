import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';

import root from 'reducers/root';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  root,
  compose(
    process.env.NODE_ENV === 'development' && (window as any).devToolsExtension
      ? (window as any).devToolsExtension()
      : (f: any) => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
