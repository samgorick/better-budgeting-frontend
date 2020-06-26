const API = 'http://localhost:3000/transactions'

export function addTransaction(transaction, navigation) {
  return dispatch => {
    dispatch({ type: "START_ADD_TRANSACTION" });
    fetch( API, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
      .then(resp => resp.json())
      .then(txnData => {
        dispatch({ type: "ADD_TRANSACTION_SUCCESS", transaction: txnData})
        navigation.navigate('Transactions')
        }
      );
  };
}

export function editTransaction(transaction, navigation) {
  return dispatch => {
    dispatch({ type: "START_EDIT_TRANSACTION" });
    fetch(`${API}/${transaction.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
      .then(resp => resp.json())
      .then(txnData => {
        dispatch({ type: "EDIT_TRANSACTION_SUCCESS", transaction: txnData})
        navigation.navigate('Transactions')
        }
      );
  };
}

export function deleteTransaction(transactionId, navigation) {
  return dispatch => {
    dispatch({ type: "START_DELETE_TRANSACTION" });
    fetch(`${API}/${transactionId}`, { method: "DELETE" })
      .then(resp => resp.json())
      .then(txnData => {
        dispatch({ type: "DELETE_TRANSACTION_SUCCESS", transactionId})
        navigation.navigate('Transactions')
        }
      );
  };
}