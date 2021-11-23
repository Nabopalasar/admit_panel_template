import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from "reselect";

import {fetchHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {heroDeleted} from "./heroesSlice";


const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (activeFilter, heroes) => {
            if (activeFilter === "all") {
                console.log("render")

                return heroes;
            } else {
                console.log("filt")

                return heroes.filter(item => item.element === activeFilter);
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    // УДАЛЕНИЕ ПЕРСОНАЖА
    const onDeleteHeroes = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, "Deleted"))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
    },[request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem
                key={id}
                {...props} onDeleteHeroes={() => onDeleteHeroes(id)}/>
        });
    }


    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    );
}

export default HeroesList;