import {combineReducers} from 'redux';
import productReducer from './product';
import categoryReducer from './category';
import cartReducer from './cart';
import authReducer from './auth';
import historyReducer from './history';

const reducers = combineReducers({
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  auth: authReducer,
  history: historyReducer,
});

export default reducers;
