export default function userReducer(state=null, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return sorted(action.transactions)
    
    case 'ADD_TRANSACTION_SUCCESS':
      return sorted([...state, action.transaction])

    default:
      return state;
  }
}

function sorted(transactionsArray){
  return transactionsArray.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
}