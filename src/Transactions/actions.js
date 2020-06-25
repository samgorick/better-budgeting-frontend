export function addTransaction(transaction, navigation) {
  return dispatch => {
    dispatch({ type: "START_ADD_TRANSACTION" });
    fetch("http://localhost:3000/transactions", {
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
    fetch("http://localhost:3000/transactions", {
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