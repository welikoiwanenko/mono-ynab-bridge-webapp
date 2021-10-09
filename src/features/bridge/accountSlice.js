import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'account',
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    setAccount: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAccount, setLoadingState } = slice.actions;

export const getMonoAccountData = () => async dispatch => {
  dispatch(setLoadingState(true));
  console.log('getMonoAccountData');
  const config = {
    method: 'get',
    url: 'https://59f3fkaau2.execute-api.eu-central-1.amazonaws.com/Prod/mono/accounts',
  };

  const { data } = await axios(config);
  dispatch(setAccount(data));
  dispatch(setLoadingState(false));
};

export const selectAccount = state => state.account.user;
export const selectAccountLoading = state => state.account.isLoading;

export default slice.reducer;
