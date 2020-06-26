export default function budgetReducer(state=null, action) {
  switch (action.type) {
    case 'SET_BUDGET':
      return action.budget
    
    case 'ADD_BUDGET_SUCCESS':
      return action.budget

    default:
      return state;
  }
}