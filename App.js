import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import { Text } from 'react-native'
import Login from './src/User/Login';
import Signup from './src/User/Signup';
import Homepage from './src/Homepage/index.js';
import AddTransaction from './src/Transactions/components/AddTransaction';
import EditTransaction from './src/Transactions/components/EditTransaction';
import AddSavings from './src/Savings/components/AddSavings';
import ShowSavings from './src/Savings/components/ShowSavings';
import Loading from './src/User/Loading'
import {createStackNavigator} from '@react-navigation/stack';
import {getCurrentUser} from './src/User/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

// Add to StackNavigator to remove header: screenOptions={{ title: "", headerShown: false }}

class App extends React.Component {

  componentDidMount() {
    this.props.getCurrentUser(this.props.navigation);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{title: '', headerShown: false}}>
          {this.props.loading ? (
            <Stack.Screen 
              name="Loading"
              component={Loading} 
            />
          ) : !this.props.user ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Homepage"
                component={Homepage}
              />
              <Stack.Screen
                name="AddTransaction"
                component={AddTransaction}
              />
              <Stack.Screen
                name="EditTransaction"
                component={EditTransaction}
              />
              <Stack.Screen
                name="AddSavings"
                component={AddSavings}
              />
              <Stack.Screen
                name="ShowSavings"
                component={ShowSavings}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user, loading: state.loading};
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
