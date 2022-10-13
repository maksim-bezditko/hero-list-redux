import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./HeroesList.css"
import { fetchHeroes } from '../../slices/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';

const stateSelector = createSelector(
    (state) => state.filtersRed.currentFilter,
    (state) => state.heroesRed.heroes,
    (state) => state.heroesRed.heroesLoadingStatus, 
    
    (currentFilter, heroes, loadingStatus) => {
        let result;

        if (currentFilter === "all") {
            console.log("render")
            result = heroes;
        } else {
            result = heroes.filter(item => item.element === currentFilter)
        };

        return {loadingStatus, result}
    })

const HeroesList = () => {
    const {result, loadingStatus} = useSelector(stateSelector)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (loadingStatus === "loading") {
        return <Spinner/>;
    } else if (loadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    key={id}
                    timeout={500}
                    classNames="hero"
                    in={true}
                    appear={true}>
                    <HeroesListItem id={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(result);

    return (
        <ul>
            {elements}
        </ul>
           
    )
}

export default HeroesList;