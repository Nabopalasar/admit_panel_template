import {createAction} from "@reduxjs/toolkit";


export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// в примере ниже createAction автоматически(неявно) подставляет аргумент который приходит в экшен в поле с названием payload
export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: "FILTERS_FETCHING"
    }
}

export const filtersFetched = (filters) => {
    return {
        type: "FILTERS_FETCHED",
        payload: filters
    }
}
export const filtersFetchingError = () => {
    return {
        type: "FILTERS_FETCHING_ERROR",
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: "ACTIVE_FILTER_CHANGED",
        payload: filter
    }
}

// export const heroCreated = (newHero) => {
//     return {
//         type: 'HEROES_CREATED',
//         payload: newHero
//
//     }
// }

export const heroCreated = createAction('HEROES_CREATED');

// export const heroDeleted = (id) => {
//     return {
//         type: "HERO_DELETED",
//         payload: id
//     }
// }

export const heroDeleted = createAction("HERO_DELETED");