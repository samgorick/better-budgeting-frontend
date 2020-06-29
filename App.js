import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/User/Login';
import Signup from './src/User/Signup';
import Homepage from './src/Homepage/index.js';
import AddTransaction from './src/Transactions/components/AddTransaction'
import EditTransaction from './src/Transactions/components/EditTransaction'
import AddSavings from './src/Savings/components/AddSavings'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator>
            {!this.props.user ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{title: 'Login'}}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{title: 'Signup'}}
              />
            </>
            ) : (
            <>
              <Stack.Screen
                name="Homepage"
                component={Homepage}
                options={{title: 'Your Budget Summary'}}
              />
              <Stack.Screen
                name="AddTransaction"
                component={AddTransaction}
                options={{title: 'Add Transaction'}}
              />
              <Stack.Screen
                name="EditTransaction"
                component={EditTransaction}
                options={{title: 'Update Transaction'}}
              />
              <Stack.Screen
                name="AddSavings"
                component={AddSavings}
                options={{title: 'Add Savings'}}
              />
            </>
            )
          }
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(App)
