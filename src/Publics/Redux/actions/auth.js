import axios from 'axios';
import {Link} from '../../env';

const URL = Link();

export const register = data => {
  return {
    type: 'REGISTER',
    payload: axios.post(URL + 'auth/register', data),
  };
};
export const login = data => {
  return {
    type: 'LOGIN',
    payload: axios.post(URL + 'auth/login', data),
  };
};

export const savetoken = token => {
  return {
    type: 'TOKEN',
    payload: token,
  };
};
