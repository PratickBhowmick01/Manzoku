import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    GET_ALL_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/userConstants.js"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case GET_ALL_USER_SUCCESS:
            return{
                ...state,
                user: action.payload,
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}