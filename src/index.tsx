import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/App';
import store from './redux/store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
