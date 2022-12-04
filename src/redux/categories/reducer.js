import {
    START_FETCHING_CATEGORIES,
    SUCCESS_FETCHING_CATEGORIES,
    ERROR_FETCHING_CATEGORIES
} from './constants'

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    status: statusList.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_CATEGORIES:
            return { ...state, status: statusList.process }

        case ERROR_FETCHING_CATEGORIES:
            return { ...state, status: statusList.error }

        case SUCCESS_FETCHING_CATEGORIES:
            console.log(action.categories);
            return { ...state, status: statusList.success, data: action.categories }

        default:
            return state
    }
}