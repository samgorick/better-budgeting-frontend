const API = 'http://localhost:3000/savings'

export function addSaving(saving, navigation) {
  return dispatch => {
    dispatch({ type: "START_ADD_SAVING" });
    fetch( API, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(saving)
    })
      .then(resp => resp.json())
      .then(savingData => {
        dispatch({ type: "ADD_SAVING_SUCCESS", savings: savingData})
        navigation.navigate('Savings')
        }
      );
  };
}