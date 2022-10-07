import { useState, useEffect } from 'react';
import { filtersUpdate, filterChange } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
var classNames = require('classnames');

const styles = {
    "all": "btn-outline-dark",
    "fire": "btn-danger",
    "water": "btn-primary",
    "wind": "btn-success",
    "earth": "btn-secondary"
}

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters)
    const currentFilter = useSelector(state => state.currentFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("http://localhost:3001/filters")
            .then(data => data.json())
            .then(data => {
                dispatch(filtersUpdate(data))
            })
    }, [])
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
                                onClick={() => dispatch(filterChange(item[0]))}
                                    >{item[1]}
                            </button>
                        )
                    })}
                    
                    {/* <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;