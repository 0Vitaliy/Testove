import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk  from 'redux-thunk'
import { combineReducers } from 'redux'
import './index.css';
import App from './App';

const initialState=[
    'smell',
    'dssfd'
];
function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}
function playList(state=initialState,action){

    if(action.type ==='ADD_TRACK'){
        return[
          ...state,
            action.payload
        ];
    }
    return state;
}







const store = createStore(combineReducers({playList,items}), composeWithDevTools(
    applyMiddleware(thunk )
));


ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
    document.getElementById('root')

            );





