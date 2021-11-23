import {configureStore} from "@reduxjs/toolkit";
import filters from "../reducers/filters";
import heroes from "../components/heroesList/heroesSlice";


const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === "string") {
        return dispatch({
            type: action
        });
    }
    return dispatch(action);

}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//
//     const ondDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === "string") {
//             return ondDispatch({
//                 type: action
//             });
//         }
//         return ondDispatch(action);
//     }
//     return store;
// }

// const store = createStore(
//     combineReducers({heroes, filters}),
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         )
//     // compose(
//     //     enhancer,
//     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     // )
// );

const store = configureStore({
   reducer: {heroes, filters},
    // getDefaultMiddleware берет middleware из configureStore, далее добавляем свой middleware stringMiddleware
    middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat(stringMiddleware),
    // process.env.NODE_ENV активирует devTools только в dev режиме
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
