const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    currentFilter: "all"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
                heroesLoadingStatus: 'idle'
            }    
        case 'HEROES_POST':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_UPDATE':
            return {
                ...state,
                filters: action.payload
            } 
        case 'FILTER_CHANGE':
            return {
                ...state,
                currentFilter: action.payload
            }     

        default: return state
    }
}

export default reducer;