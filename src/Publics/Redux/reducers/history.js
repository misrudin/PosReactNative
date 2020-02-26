const initialValue = {
  historyData: [],
  paymentData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
};

const historyReducer = (state = initialValue, action) => {
  switch (action.type) {
    //for get product data
    case 'GET_HISTORY_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_HISTORY_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_HISTORY_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        historyData: action.payload.data.result,
      };
    case 'GET_PAYMENT_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PAYMENT_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_PAYMENT_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        paymentData: action.payload.data.result,
      };

    default:
      return state;
  }
};

export default historyReducer;
