import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllTransactions from '../Transactions/components/AllTransactions'
import Summary from '../Homepage/components/Summary'
import Savings from '../Savings/components/SavingsSummary'

const Tab = createBottomTabNavigator();

class Homepage extends React.Component {
  render() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Summary" component={Summary} />
          <Tab.Screen name="Transactions" component={AllTransactions} />
          <Tab.Screen name="Savings" component={Savings} />
        </Tab.Navigator>
    );
  }
}

export default Homepage;
