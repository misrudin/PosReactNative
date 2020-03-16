import axios from 'axios';

const urls = 'http://52.70.29.181:4001/api/v1/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMCwidXNlcm5hbWUiOiJ1ZGluIiwicm9sZSI6MSwiaWF0IjoxNTgyNDAzMTc0fQ.Q7I9gI3WfX0EjCua3fjsUdSe2hCwV1ztK3bj_Db2Cbc';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    payload: axios.get(urls + 'payment/all', {
      headers: {
        token: token,
      },
    }),
  };
};
export const getPaymentHistory = () => {
  return {
    type: 'GET_PAYMENT',
    payload: axios.get(urls + 'payment', {
      headers: {
        token: token,
      },
    }),
  };
};
