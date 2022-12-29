import {
    SET_NOTIF,
    CLEAR_NOTIF
} from './constants'

const initialState = {
    status: false,
    typeNotif: '',
    message: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_NOTIF:
            return { ...state, status: action.status, typeNotif: action.typeNotif, message: action.message }

        case CLEAR_NOTIF:
            return { ...initialState }

        default:
            return state
    }
}