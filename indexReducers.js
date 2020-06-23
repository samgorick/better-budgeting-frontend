import { combineReducers } from 'redux'
import userReducer from './src/User/reducers'

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer