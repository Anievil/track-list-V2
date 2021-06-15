import {combineReducers} from 'redux';
import getBandReducer from './bandReducer';
import getAlbumsReducer from './albumsReducer'
import getUserReducer from './usersReduser'

const appReducer=combineReducers({
   Store: getBandReducer,
   albumStore: getAlbumsReducer,
   userStore: getUserReducer
});

export default appReducer;