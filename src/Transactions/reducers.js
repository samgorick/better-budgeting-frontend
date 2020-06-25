export default function userReducer(state=null, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return action.transactions
    
    case 'ADD_TRANSACTION_SUCCESS':
      return [...state, action.transaction]

    default:
      return state;
  }
}