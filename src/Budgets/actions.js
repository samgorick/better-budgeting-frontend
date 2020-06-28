const API = 'http://localhost:3000/budgets'

export function addBudget(budget, navigation) {
  return dispatch => {
    dispatch({ type: "START_CREATE_BUDGET" });
    fetch( API, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(budget)
    })
      .then(resp => resp.json())
      .then(budgetData => {
        dispatch({ type: "ADD_BUDGET_SUCCESS", budget: budgetData})
        navigation.navigate('Summary')
        }
      );
  };
}