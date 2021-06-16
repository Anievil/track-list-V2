import ACTION from '../actions/actionTypes';


const initialState = {
    error: null,
    data: null,
    status: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CLEAR_DATA: {
            console.log('ok')
            return {
                data: null,
            }
        }

        case ACTION.DELETE_ALBUM_SUCCESS: {
            return {
                data: state.data.filter(album => album._id !== action.data._id),
                error: null                
            }
        }
        case ACTION.DELETE_ALBUM_ERROR: {
            return {
                data: null,
                error: action.error              
            }
        }

        case ACTION.GET_ALBUM_LIST_SUCCESS: {
            return {
                ...state,
                data: action.data.data,
                error: null                
            }
        }
        case ACTION.GET_ALBUM_LIST_ERROR: {
            return {
                ...state,
                data: null,
                error: action.error,               
            }
        }


        case ACTION.POST_ALBUM_DATA_SUCCESS: {
            return {
                error: null,       
                status: action
            }
        }
        case ACTION.POST_ALBUM_DATA_ERROR: {
            return {
                error: action.error,
                status: action
            }
        }

        default:
            return state;
    }
}