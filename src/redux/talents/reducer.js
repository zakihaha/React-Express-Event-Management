import {
    START_FETCHING_TALENTS,
    SUCCESS_FETCHING_TALENTS,
    ERROR_FETCHING_TALENTS,
    SET_KEYWORD,
} from './constants'

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    keyword: '',
    status: statusList.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_TALENTS:
            return { ...state, status: statusList.process }

        case ERROR_FETCHING_TALENTS:
            return { ...state, status: statusList.error }

        case SUCCESS_FETCHING_TALENTS:
            return { ...state, status: statusList.success, data: action.talents }

        case SET_KEYWORD:
            return { ...state, keyword: action.keyword }

        default:
            return state
    }
}