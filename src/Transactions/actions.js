import {
  ADD_TRANSACTION_SUCCESS,
  EDIT_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS
} from '../constants/Types';

const API = 'http://localhost:3000/transactions';

export function addTransaction(transaction, navigation) {
  return dispatch => {
    fetch(API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({transaction: transaction})
    })
      .then(resp => resp.json())
      .then(txnData => {
        dispatch({type: ADD_TRANSACTION_SUCCESS, transaction: txnData});
        navigation.navigate('Transactions');
      });
  };
}

export function editTransaction(transaction, navigation) {
  return dispatch => {
    fetch(`${API}/${transaction.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({transaction: transaction})
    })
      .then(resp => resp.json())
      .then(txnData => {
        dispatch({type: EDIT_TRANSACTION_SUCCESS, transaction: txnData});
        navigation.navigate('Transactions');
      });
  };
}

export function deleteTransaction(transactionId, navigation) {
  return dispatch => {
    fetch(`${API}/${transactionId}`, {method: 'DELETE'})
      .then(resp => resp.json())
      .then(txnData => {
        dispatch({type: DELETE_TRANSACTION_SUCCESS, transactionId});
        navigation.navigate('Transactions');
      });
  };
}
