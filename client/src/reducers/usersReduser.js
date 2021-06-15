import ACTION from '../actions/actionTypes';


const initialState = {
    error: null,
    data: null,
    status: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.SET_USER_DATA: {
            return {
                data: action.data,
                error: null
            }
        }
        case ACTION.AUTH_ACTION_LOGIN: {
            return {
                data: action.data.data,
                error: null
            }
        }
        case ACTION.AUTH_ACTION_SUCCESS: {
            return {
                isFetching: false,
                error: null
            }
        }
        case ACTION.AUTH_ACTION_ERROR: {
            return {
                isFetching: false,
                error: action.error
            }
        }

        case ACTION.AUTH_ACTION_CLEAR_ERROR:{
            return{
                ...state,
                error: null
            }
        }
        case ACTION.AUTH_ACTION_CLEAR:{
            return initialState;
        }
        default:
            return state;
    }
}