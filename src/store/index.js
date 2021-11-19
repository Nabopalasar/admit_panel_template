import {createStore, combineReducers, compose} from 'redux';
import filters from "../reducers/filters";
import heroes from "../reducers/heroes";
import {applyMiddleware} from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk"

const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === "string") {
        return dispatch({
            type: action
        });
    }
    return dispatch(action);

}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const ondDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === "string") {
            return ondDispatch({
                type: action
            });
        }
        return ondDispatch(action);
    }
    return store;
}

const store = createStore(
    combineReducers({heroes, filters}),
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    // compose(
    //     enhancer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);

export default store;
