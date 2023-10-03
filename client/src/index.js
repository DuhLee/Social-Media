import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import App from './App';
import './index.css';

const store = legacy_createStore(rootReducer, compose(applyMiddleware(thunk)));
const theme = createTheme();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
    ,document.getElementById('root')
)