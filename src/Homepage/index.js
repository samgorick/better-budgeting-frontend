import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllTransactions from '../Transactions/components/AllTransactions';
import Summary from './components/Summary';
import Savings from '../Savings/components/SavingsSummary';
import AddBudget from '../Budgets/components/AddBudget';
import EditBudget from '../Budgets/components/EditBudget';
import Settings from './components/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();

class Homepage extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Summary') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Edit Budget') {
              iconName = focused ? 'ios-create' : 'ios-create';
            } else if (route.name === 'Transactions') {
              iconName = focused ? 'ios-card' : 'ios-card';
            } else if (route.name === 'Savings') {
              iconName = focused ? 'ios-cash' : 'ios-cash';
            } else if (route.name === 'Add Budget') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#43C59E',
          inactiveTintColor: 'gray',
        }}>
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
  return {budget: state.budget};
};

export default connect(mapStateToProps)(Homepage);
