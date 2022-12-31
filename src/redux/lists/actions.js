import {
    START_FETCHING_LISTS_CATEGORIES,
    SUCCESS_FETCHING_LISTS_CATEGORIES,
    ERROR_FETCHING_LISTS_CATEGORIES,
    START_FETCHING_LISTS_TALENTS,
    SUCCESS_FETCHING_LISTS_TALENTS,
    ERROR_FETCHING_LISTS_TALENTS,
    START_FETCHING_LISTS_EVENTS,
    SUCCESS_FETCHING_LISTS_EVENTS,
    ERROR_FETCHING_LISTS_EVENTS,
} from './constants'

import debounce from 'debounce-promise'
import { getData } from '../../utils/fetch'

let debouncedFetchListsCategories = debounce(getData, 1000)
let debouncedFetchListsTalents = debounce(getData, 1000)
let debouncedFetchListsEvents = debounce(getData, 1000)

// CATEGORIES
export const startFetchingListsCategories = () => {
    return {
        type: START_FETCHING_LISTS_CATEGORIES
    }
}

export const successFetchingListsCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_CATEGORIES,
        categories
    }
}

export const errorFetchingListsCategories = () => {
    return {
        type: ERROR_FETCHING_LISTS_CATEGORIES
    }
}

export const fetchListsCategories = () => {
    return async (dispatch) => {
        dispatch(startFetchingListsCategories())

        try {
            let res = await debouncedFetchListsCategories('/cms/categories')

            let _temp = [];

            res.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'category' },
                })
            })

            dispatch(successFetchingListsCategories({ categories: _temp }))
        } catch (error) {
            dispatch(errorFetchingListsCategories())
        }
    }
}

// TALENTS
export const startFetchingListsTalents = () => {
    return {
        type: START_FETCHING_LISTS_TALENTS
    }
}

export const successFetchingListsTalents = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_TALENTS,
        talents
    }
}

export const errorFetchingListsTalents = () => {
    return {
        type: ERROR_FETCHING_LISTS_TALENTS
    }
}

export const fetchListsTalents = () => {
    return async (dispatch) => {
        dispatch(startFetchingListsTalents())

        try {
            let res = await debouncedFetchListsTalents('/cms/talents')

            let _temp = [];

            res.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'talent' },
                })
            })

            dispatch(successFetchingListsTalents({ talents: _temp }))
        } catch (error) {
            dispatch(errorFetchingListsTalents())
        }
    }
}

// EVENTS
export const startFetchingListsEvents = () => {
    return {
        type: START_FETCHING_LISTS_EVENTS
    }
}

export const successFetchingListsEvents = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_EVENTS,
        events
    }
}

export const errorFetchingListsEvents = () => {
    return {
        type: ERROR_FETCHING_LISTS_EVENTS
    }
}

export const fetchListsEvents = () => {
    return async (dispatch) => {
        dispatch(startFetchingListsEvents())

        try {
            let res = await debouncedFetchListsEvents('/cms/events')

            let _temp = [];

            res.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'event' },
                })
            })

            dispatch(successFetchingListsEvents({ events: _temp }))
        } catch (error) {
            dispatch(errorFetchingListsEvents())
        }
    }
}
