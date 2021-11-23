import {configureStore} from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/filtersSlice";
import heroes from "../components/heroesList/heroesSlice";


const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === "string") {
        return dispatch({
            type: action
        });
    }
    return dispatch(action);
}

const store = configureStore({
   reducer: {heroes, filters},
    // getDefaultMiddleware берет middleware из configureStore, далее добавляем свой middleware stringMiddleware
    middleware: getDefaultMiddleware =>  getDefaultMiddleware().concat(stringMiddleware),
    // process.env.NODE_ENV активирует devTools только в dev режиме
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
