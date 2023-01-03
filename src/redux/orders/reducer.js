import {
    START_FETCHING_ORDERS,
    SUCCESS_FETCHING_ORDERS,
    ERROR_FETCHING_ORDERS,
    SET_PAGE,
    SET_DATE,
} from './constants'

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const initialState = {
    data: [],
    page: 1,
    limit: 1,
    pages: 1,
    date: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    },
    status: statusList.idle
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ORDERS:
            return { ...state, status: statusList.process }

        case ERROR_FETCHING_ORDERS:
            return { ...state, status: statusList.error }

        case SUCCESS_FETCHING_ORDERS:
            return { ...state, status: statusList.success, pages: action.pages, data: action.orders }

        case SET_PAGE:
            return { ...state, page: action.page }

        case SET_DATE:
            return { ...state, date: action.ranges }

        default:
            return state
    }
}