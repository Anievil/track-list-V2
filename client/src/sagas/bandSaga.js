import {put} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* editBandInfo(action){
    try{
        const data=yield  restController.editBandInfo(action.data);
        yield  put({type: ACTION.EDIT_BAND_INFO_SUCCESS});
    }
    catch (e) {
        yield put({type: ACTION.EDIT_BAND_INFO_ERROR, error: e.response});
    }
}

export function* findBand(action){
    try{
        const data=yield  restController.findBand(action.data);
        yield  put({type: ACTION.GET_SEARCH_BAND_SUCCESS, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_SEARCH_BAND_ERROR, error: e.response});
    }
}

export function* getBandList(){
    try{
        const data=yield  restController.getBandList();
        yield  put({type: ACTION.GET_BAND_LIST_SUCCESS, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_BAND_LIST_ERROR, error: e.response});
    }
}

export function* sendBandData(action){
    try{
        const data=yield  restController.sendBandData(action.data);
        yield  put({type: ACTION.POST_BAND_DATA_SUCCESS, status: data});
    }
    catch (e) {
        yield put({type: ACTION.POST_BAND_DATA_ERROR, error: e.response, status: action.data.data});
    }
}