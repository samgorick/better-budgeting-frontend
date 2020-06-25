import { combineReducers } from 'redux'
import userReducer from './src/User/reducers'
import transactionsReducer from './src/Transactions/reducers'

const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionsReducer
})

export default rootReducer