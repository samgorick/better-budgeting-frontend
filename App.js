import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './src/User/Login';
import Signup from './src/User/Signup';
import AddTransaction from './src/Transactions/components/AddTransaction';
import EditTransaction from './src/Transactions/components/EditTransaction';
import AddSavings from './src/Savings/components/AddSavings';
import ShowSavings from './src/Savings/components/ShowSavings';
import Loading from './src/User/Loading';
import {createStackNavigator} from '@react-navigation/stack';
import {getCurrentUser} from './src/User/actions';
import AllTransactions from './src/Transactions/components/AllTransactions';
import Summary from './src/Homepage/components/Summary';
import Savings from './src/Savings/components/SavingsSummary';
import AddBudget from './src/Budgets/components/AddBudget';
import EditBudget from './src/Budgets/components/EditBudget';
import Settings from './src/Homepage/components/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SavingsStack = createStackNavigator();
const TransactionsStack = createStackNavigator();

function SavingsStackScreen() {
  return (
    <SavingsStack.Navigator screenOptions={{title: '', headerShown: false}}>
      <SavingsStack.Screen name="Savings" component={Savings} />
      <SavingsStack.Screen name="AddSavings" component={AddSavings} />
      <SavingsStack.Screen name="ShowSavings" component={ShowSavings} />
    </SavingsStack.Navigator>
  );
}

function TransactionsStackScreen() {
  return (
    <TransactionsStack.Navigator
      screenOptions={{title: '', headerShown: false}}>
      <TransactionsStack.Screen
        name="Transactions"
        component={AllTransactions}
      />
      <TransactionsStack.Screen
        name="AddTransaction"
        component={AddTransaction}
      />
      <TransactionsStack.Screen
        name="EditTransaction"
        component={EditTransaction}
      />
    </TransactionsStack.Navigator>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser(this.props.navigation);
  }

  render() {
    return (
      <NavigationContainer>
        {this.props.loading ? (
          <Stack.Navigator screenOptions={{title: '', headerShown: false}}>
            <Stack.Screen name="Loading" component={Loading} />
          </Stack.Navigator>
        ) : !this.props.user ? (
          <Stack.Navigator screenOptions={{title: '', headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        ) : (
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
                  iconName = focused
                    ? 'ios-add-circle'
                    : 'ios-add-circle-outline';
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
            <Tab.Screen
              name="Transactions"
              component={TransactionsStackScreen}
            />
            <Tab.Screen name="Savings" component={SavingsStackScreen} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user, loading: state.loading, budget: state.budget};
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: (token, navigation) =>
      dispatch(getCurrentUser(token, navigation)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
