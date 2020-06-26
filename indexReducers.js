import { combineReducers } from 'redux'
import userReducer from './src/User/reducers'
import transactionsReducer from './src/Transactions/reducers'
import budgetReducer from './src/Budgets/reducers'

const rootReducer = combineReducers({
  user: userReducer,
  transactions: transactionsReducer,
  budget: budgetReducer
})

export default rootReducer