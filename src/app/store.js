import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/bridge/accountSlice';
import transactionReducer from '../features/bridge/transactionSlice';

export default configureStore({
  reducer: {
    account: accountReducer,
    transaction: transactionReducer,
  },
});
