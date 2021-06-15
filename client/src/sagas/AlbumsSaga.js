import {put, call} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* deleteAlbum(action){
    try{
        yield  call(restController.deleteAlbum, action.data);
        yield  put({type: ACTION.DELETE_ALBUM_SUCCESS, data: action.data});
    }
    catch (e) {
        yield put({type: ACTION.DELETE_ALBUM_ERROR, error: e.response});
    }
}

export function* getAlbumList(action){
    try{
        const data=yield  restController.getAlbumList(action.data);
        yield  put({type: ACTION.GET_ALBUM_LIST_SUCCESS, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_ALBUM_LIST_ERROR, error: e.response});
    }
}

export function* sendAlbumData(action){
    try{
        yield  restController.sendAlbumData(action.data);
        yield  put({type: ACTION.POST_ALBUM_DATA_SUCCESS, status: action.data.data});
    }
    catch (e) {
        yield put({type: ACTION.POST_ALBUM_DATA_ERROR, error: e.response, status: action.data.data});
    }
}