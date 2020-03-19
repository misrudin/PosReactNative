import AsyncStorage from '@react-native-community/async-storage';
const initialValue = {
  dataUser: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  datalogin: [],
  token: null,
  loading: true,
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'REGISTER_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataUser: action.payload.data.result,
      };
    case 'LOGIN_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data.msg,
      };
    case 'LOGIN_FULFILLED':
      console.log('token', action.payload.data.token);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        token: action.payload.data.token,
      };
    case 'TOKEN':
      if (action.payload !== null) {
        AsyncStorage.setItem('Token', action.payload);
        return {
          ...state,
          loading: false,
          token: action.payload,
        };
      } else {
        return {
          ...state,
          loading: false,
          token: null,
        };
      }
    case 'ID_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ID_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'ID_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        datalogin: action.payload.data,
        dataUser: action.payload.data.result,
      };
    case 'ROLE_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ROLE_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'ROLE_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataUser: action.payload.data.result,
      };
    default:
      return state;
  }
};

export default userReducer;
