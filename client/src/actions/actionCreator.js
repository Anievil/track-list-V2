import ACTION from './actionTypes';

export const userData = (data) => {
    return {
        type: ACTION.SET_USER_DATA,
        data: data,
    }
};

export const authActionRegistration = (data, history) => {
    return {
        type: ACTION.AUTH_ACTION_REGISTER,
        data: data,
        history: history
    }
};

export const authActionLogin = (data, history) => {
    return {
        type: ACTION.AUTH_ACTION_LOGIN,
        data: data,
        history: history
    }
};

export const clearAuth = () => {
    return {
        type: ACTION.AUTH_ACTION_CLEAR
    }
};


export const editBandInfo=(data)=>{
    return{
        type: ACTION.EDIT_BAND_INFO,
        data: data
    }
};

export const deleteAlbum=(data)=>{
    return{
        type: ACTION.DELETE_ALBUM,
        data: data
    }
};

export const sendAlbumData=(data)=>{
    return{
        type: ACTION.POST_ALBUM_DATA,
        data: data
    }
};

export const getAlbumList=(data)=>{
    return{
        type: ACTION.GET_ALBUM_LIST,
        data: data
    }
};

export const findBand=(data)=>{
    return{
        type: ACTION.GET_SEARCH_BAND,
        data: data
    }
};

export const getBandList=()=>{
    return{
        type: ACTION.GET_BAND_LIST,
    }
};

export const sendBandData =(data)=>{
    return{
        type: ACTION.POST_BAND_DATA,
        data: data
    }
};