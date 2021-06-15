import http from '../interceptor';

export const editBandInfo = (data) => http.post('editBandInfo', data);
export const deleteAlbum = (data) => http.post('deleteAlbum', data);
export const getBandList = () => http.post('getBandList');
export const findBand = (data) => http.post('findBand', data);
export const getAlbumList = (data) => http.post('getAlbumList', data);
export const sendAlbumData = (data) => http.post('sendAlbumData', data);
export const sendBandData = (data) => http.post('postBandData', data);
export const loginRequest = (data) => http.post('login', data);
export const registerRequest = (data) => http.post('registration', data);










