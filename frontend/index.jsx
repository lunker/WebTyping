import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';


const Root = () => (
  <div>
    <App />
  </div>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
