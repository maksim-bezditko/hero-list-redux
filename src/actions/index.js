export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (id) => {
    return {
        type: 'HEROES_DELETE',
        payload: id
    }
}

export const heroesPost = (hero) => {
    return {
        type: 'HEROES_POST',
        payload: hero
    }
}

export const filtersUpdate = (filters) => {
    return {
        type: 'FILTERS_UPDATE',
        payload: filters
    }
}

export const filterChange= filter => {
    return {
        type: 'FILTER_CHANGE',
        payload: filter
    }
}