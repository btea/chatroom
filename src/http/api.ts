import axios from 'axios';
export const baseURL = 'http://192.168.124.7:2233';
axios.defaults.baseURL = baseURL;
export default axios;
