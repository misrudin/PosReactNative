import {combineReducers} from 'redux';
import productReducer from './product';
import categoryReducer from './category';
import cartReducer from './cart';
import userReducer from './auth';

const reducers = combineReducers({
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  auth: userReducer,
});

export default reducers;
