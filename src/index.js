import React from 'react';
import { render } from 'react-dom';


import { Provider } from "react-redux";
import store from "./store";
import './scss/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
