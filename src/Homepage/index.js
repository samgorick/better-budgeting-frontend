import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllTransactions from '../Transactions/components/AllTransactions'
import Summary from './components/Summary'
import Savings from '../Savings/components/SavingsSummary'
import AddBudget from '../Budgets/components/AddBudget'
import EditBudget from '../Budgets/components/EditBudget'
import Settings from './components/Settings'
import { connect } from 'react-redux'

const Tab = createBottomTabNavigator();

class Homepage extends React.Component {
  render() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Summary" component={Summary} />
          {this.props.budget.length > 0 ? (
            <Tab.Screen name="Edit Budget" component={EditBudget} />
          ) : (
            <Tab.Screen name="Add Budget" component={AddBudget} />
          )}
          <Tab.Screen name="Transactions" component={AllTransactions} />
          <Tab.Screen name="Savings" component={Savings} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budget}
}

export default connect(mapStateToProps)(Homepage);
