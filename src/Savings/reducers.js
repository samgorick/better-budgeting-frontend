export default function savingReducer(state=[], action) {
  console.log(action)
  switch (action.type) {
    case 'SET_SAVINGS':
      return action.savings
    
    case 'ADD_SAVING_SUCCESS':
      return [...state, action.savings]

    default:
      return state;
  }
}