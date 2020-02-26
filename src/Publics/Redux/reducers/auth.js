const initialValue = {
  userData: [],
  token: '',
};

const authReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        userData: state.userData + action.payload,
      };
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };

    default:
      return {
        state,
      };
  }
};

export default authReducer;
