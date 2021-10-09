import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Carousel from './components/Carousel';


import {
  selectAccount,
  selectAccountLoading,
  // getMonoAccountData,
} from './accountSlice';
import {
  selectTransactions,
  selectTransactionsLoading,
  getMonoTransactionsData,
} from './transactionSlice';

export function Bridge() {
  const [loading, setLoading] = React.useState(false);
  const account = useSelector(selectAccount);
  const transactions = useSelector(selectTransactions);
  const isTransactionsLoading = useSelector(selectTransactionsLoading);
  const isAccountLoading = useSelector(selectAccountLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account) {
      // dispatch(getMonoAccountData());
    }
  }, [account, dispatch])

  useEffect(() => {
    if (!transactions) {
      dispatch(getMonoTransactionsData());
    }
  }, [transactions, dispatch]);

  useEffect(() => {
    setLoading(isAccountLoading || isTransactionsLoading);
  }, [isAccountLoading, isTransactionsLoading])

  return (
    <div className="wrapper">
      {loading &&
        <Box sx={{display: 'flex'}}>
          <CircularProgress sx={{color: 'black'}}/>
        </Box>
      }
      {!loading &&
        <Carousel items={transactions || []}/>
      }
    </div>
  );
}
