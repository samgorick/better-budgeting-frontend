export default function budgetReducer(state=[], action) {
  switch (action.type) {
    case 'SET_BUDGET':
      return action.budget
    
    case 'ADD_BUDGET_SUCCESS':
      return action.budget

    case 'EDIT_BUDGET_SUCCESS':
      return state.map(budgetCategory => budgetCategory.id === action.budget.id ? action.budget : budgetCategory)

    default:
      return state;
  }
}