import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import  {productListComponent} from './js/ActionReducers/productListing/productListingReducers.js';

let _PreloadedState = {
}
export default createStore(
    combineReducers({productListComponent}),
    _PreloadedState,
    composeWithDevTools(
        applyMiddleware(logger),
    )
);
