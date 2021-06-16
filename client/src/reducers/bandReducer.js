import ACTION from '../actions/actionTypes';


const initialState = {
    error: null,
    data: null,
    status: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        
        case ACTION.EDIT_BAND_INFO_SUCCESS: {
            return {
                error: null,
            }
        }
        case ACTION.EDIT_BAND_INFO_ERROR: {
            return {
                error: action.error,
            }
        }

        
        case ACTION.GET_SEARCH_BAND_SUCCESS: {
            return {
                ...state,
                data: action.data.data,
                error: null,
                
            }
        }
        case ACTION.GET_SEARCH_BAND_ERROR: {
            return {
                ...state,
                data: null,
                error: action.error,
                
            }
        }

        
        case ACTION.GET_BAND_LIST_SUCCESS: {
            return {
                ...state,
                data: action.data.data,
                error: null,
                
            }
        }
        case ACTION.GET_BAND_LIST_ERROR: {
            return {
                ...state,
                data: null,
                error: action.error,
                
            }
        }


        case ACTION.POST_BAND_DATA_SUCCESS: {
            return {
                error: null,
                status: action
            }
        }
        case ACTION.POST_BAND_DATA_ERROR: {
            return {
                status: action,
                error: action.error,
            }
        }
        default:
            return state;
    }
}