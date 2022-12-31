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

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    categories: [],
    statusCategories: statusList.idle,
    talents: [],
    statusTalents: statusList.idle,
    events: [],
    statusEvents: statusList.idle,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_LISTS_CATEGORIES:
            return { ...state, statusCategories: statusList.process }
        case ERROR_FETCHING_LISTS_CATEGORIES:
            return { ...state, statusCategories: statusList.error }
        case SUCCESS_FETCHING_LISTS_CATEGORIES:
            return { ...state, statusCategories: statusList.success, categories: action.categories }


        case START_FETCHING_LISTS_TALENTS:
            return { ...state, statusTalents: statusList.process }
        case ERROR_FETCHING_LISTS_TALENTS:
            return { ...state, statusTalents: statusList.error }
        case SUCCESS_FETCHING_LISTS_TALENTS:
            return { ...state, statusTalents: statusList.success, talents: action.talents }


        case START_FETCHING_LISTS_EVENTS:
            return { ...state, statusEvents: statusList.process }
        case ERROR_FETCHING_LISTS_EVENTS:
            return { ...state, statusEvents: statusList.error }
        case SUCCESS_FETCHING_LISTS_EVENTS:
            return { ...state, statusEvents: statusList.success, events: action.events }

        default:
            return state
    }
}