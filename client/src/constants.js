const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = env === 'production' ? 3000 : 9633;
export default {
  MODER: 'moderator',
  BASE_URL: `http://${ serverIP }:${ serverPort }/`,
  ACCESS_TOKEN: 'accessToken'
};