import {takeLatest, takeLeading, takeEvery} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {getBandList, sendBandData, findBand, editBandInfo} from './bandSaga';
import {getAlbumList, sendAlbumData, deleteAlbum} from './AlbumsSaga'
import {loginSaga, registerSaga} from './userSaga'

function* rootSaga() {
    yield  takeLatest(ACTION.EDIT_BAND_INFO, editBandInfo);
    yield  takeLatest(ACTION.AUTH_ACTION_LOGIN, loginSaga);
    yield  takeLatest(ACTION.AUTH_ACTION_REGISTER, registerSaga);
    yield  takeLatest(ACTION.DELETE_ALBUM, deleteAlbum);
    yield  takeLatest(ACTION.GET_SEARCH_BAND, findBand);
    yield  takeLatest(ACTION.GET_ALBUM_LIST, getAlbumList);
    yield  takeLatest(ACTION.POST_ALBUM_DATA, sendAlbumData);
    yield  takeLatest(ACTION.GET_BAND_LIST, getBandList);
    yield  takeLatest(ACTION.POST_BAND_DATA, sendBandData);
}

export default rootSaga;