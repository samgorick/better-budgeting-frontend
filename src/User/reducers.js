export default function userReducer(state=null, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log(action.user)
      return action.user
    default:
      return state;
  }
}