import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'transaction',
  initialState: {
    items: null,
    isLoading: false,
  },
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    setTransactions: (state, action) => {
      state.items = action.payload.sort((a, b) => a.time - b.time);
    },
  },
});

export const { setTransactions, setLoadingState } = slice.actions;

export const getMonoTransactionsData = () => async dispatch => {
  dispatch(setLoadingState(true));

  console.log('getMonoTransactionsData');
  const config = {
    method: 'get',
    url: 'https://59f3fkaau2.execute-api.eu-central-1.amazonaws.com/Prod/mono',
  };

  const { data } = await axios(config);
  dispatch(setTransactions(data));

  dispatch(setLoadingState(false));
};

export const selectTransactions = state => state.transaction.items;
export const selectTransactionsLoading = state => state.transaction.isLoading;

export default slice.reducer;
