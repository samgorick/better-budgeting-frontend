export function addTransaction(transaction) {
  return dispatch => {
    dispatch({ type: "START_USER_LOGIN" });
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          alert(userData.error)
        } else {
          dispatch({ type: 'LOGIN_USER', user: userData})
        }
      });
  };
}