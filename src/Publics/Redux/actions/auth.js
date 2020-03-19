import axios from 'axios';
import {Link} from '../../env';

const URL = Link();

export const register = fd => {
  return {
    type: 'REGISTER',
    payload: axios.post(URL + 'user', fd),
  };
};
export const login = data => {
  return {
    type: 'LOGIN',
    payload: axios.post(URL + 'user/login', data),
  };
};
export const getByidUser = id => {
  return {
    type: 'ID',
    payload: axios.get(URL + `user?id=${id}`),
  };
};
export const editRole = id => {
  return {
    type: 'ROLE',
    payload: axios.patch(URL + `user/role?id=${id}`),
  };
};
export const savetoken = token => {
  return {
    type: 'TOKEN',
    payload: token,
  };
};
