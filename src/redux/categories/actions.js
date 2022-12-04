import {
    START_FETCHING_CATEGORIES,
    SUCCESS_FETCHING_CATEGORIES,
    ERROR_FETCHING_CATEGORIES
} from './constants'

import debounce from 'debounce-promise'
import { getData } from '../../utils/fetch'
import { clearNotif } from '../notif/actions'

let debouncedFetchCategories = debounce(getData, 1000)

export const startFetchingCategories = () => {
    return {
        type: START_FETCHING_CATEGORIES
    }
}

export const successFetchingCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_CATEGORIES,
        categories
    }
}

export const errorFetchingCategories = () => {
    return {
        type: ERROR_FETCHING_CATEGORIES
    }
}

export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(startFetchingCategories())

        try {
            setTimeout(() => {
                dispatch(clearNotif())
            }, 5000)
            let res = await debouncedFetchCategories('/cms/categories')

            console.log(res.data.data);

            dispatch(successFetchingCategories({ categories: res.data.data }))
        } catch (error) {
            dispatch(errorFetchingCategories())
        }
    }
}