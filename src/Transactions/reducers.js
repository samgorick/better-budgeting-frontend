export default function transactionsReducer(state = [], action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return sorted(action.transactions);

    case 'ADD_TRANSACTION_SUCCESS':
      return sorted([...state, action.transaction]);

    case 'EDIT_TRANSACTION_SUCCESS':
      return sorted(
        state.map(transaction =>
          transaction.id === action.transaction.id
            ? action.transaction
            : transaction,
        ),
      );

    case 'DELETE_TRANSACTION_SUCCESS':
      return sorted(
        state.filter(transaction => transaction.id !== action.transactionId),
      );

    case 'LOGOUT_TRANSACTIONS':
      return [];

    default:
      return state;
  }
}

function sorted(transactionsArray) {
  return transactionsArray.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1,
  );
}
