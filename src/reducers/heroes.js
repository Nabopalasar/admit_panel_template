import {createReducer} from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

/*ВАНИАНТ С ИСПОЛЬЗОВАНИЕМ createReducer*/

// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             // в примере ниде иммутабельность не нарушается. Этим занимается createReducer
//             // при этом чтобы все работало исправно из вункции ничего не надо возвращать
//             state.heroesLoadingStatus = "loading";
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = "idle";
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = "error";
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addDefaultCase(() => {});
// });

/*ВАРИАНТ СХОЖИЙ С ВЕРХНИМ НО РАБОТАЕТ ТОЛЬКО С ЧИСТЫМ JS*/

// 1й initialState 2й обьект с actionS
const heroes = createReducer(initialState, {
        [heroesFetching]: state => {
            // в примере ниде иммутабельность не нарушается. Этим занимается createReducer
            // при этом чтобы все работало исправно из вункции ничего не надо возвращать
            state.heroesLoadingStatus = "loading";
            // как вариант модно использовать такую запить
            // {state.heroesLoadingStatus = "loading"}
        },
        [heroesFetched]: (state, action) => {
            state.heroesLoadingStatus = "idle";
            state.heroes = action.payload;
        },
        [heroesFetchingError]: state => {
            state.heroesLoadingStatus = "error"
        },
        [heroCreated]: (state, action) => {
            state.heroes.push(action.payload);
        },
        [heroDeleted]: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    // 3й аргумент массив функции сровнения
    [],
    //4й функфия для дейсвий по умолчанию
    state => state);

/*БАЗОВЫЙ ВАРИАНТ*/
// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }
//         case "HERO_DELETED":
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         default:
//             return state
//     }
// }

export default heroes;