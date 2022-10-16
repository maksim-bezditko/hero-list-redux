import { change } from '../../slices/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFiltersQuery } from '../../apis/filtersApi';
import { currentFilterSelector } from '../../selectors/currentFilterSelector';

var classNames = require('classnames');

const styles = {
    "all": "btn-outline-dark",
    "fire": "btn-danger",
    "water": "btn-primary",
    "wind": "btn-success",
    "earth": "btn-secondary"
}



const HeroesFilters = () => {
    const { data: filters = [] } = useGetFiltersQuery();

    const currentFilter = useSelector(currentFilterSelector);

    const dispatch = useDispatch()

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