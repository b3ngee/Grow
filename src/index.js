import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

import TransactionHistory from './components/TransactionHistory';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TransactionHistory} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('.container'));
