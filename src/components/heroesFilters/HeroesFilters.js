import { useEffect } from 'react';
import { fetchFilters } from '../../slices/filtersSlice';
import { change } from '../../slices/filtersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

var classNames = require('classnames');

const styles = {
    "all": "btn-outline-dark",
    "fire": "btn-danger",
    "water": "btn-primary",
    "wind": "btn-success",
    "earth": "btn-secondary"
}

const selector = createSelector(
    state => [state.filtersRed.filters, state.filtersRed.currentFilter],
    ([filters, currentFilter]) => ({filters, currentFilter})
)

const HeroesFilters = () => {
    const {filters, currentFilter} = useSelector(selector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFilters())
    }, [dispatch])
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map((item, index) => {
                        return (
                            <button 
                                key={index}
                                className={classNames("btn", styles[item[0]], {active: currentFilter === item[0]})}
                                onClick={() => dispatch(change(item[0]))}
                                    >{item[1]}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;