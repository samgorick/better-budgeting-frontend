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
import ShowSavings from './src/Savings/components/ShowSavings'
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {getCurrentUser} from './src/User/actions'

const Stack = createStackNavigator();

// Add to StackNavigator to remove header: screenOptions={{ title: "", headerShown: false }}

class App extends React.Component {



  componentDidMount(){

    getData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt')
        if(token !== null) {
          return token
        }
      } catch(err) {
        console.log(err)
      }
    }

    const token = getData()
    console.log(token)
    if(token){
      getCurrentUser(token, this.props.navigation)
    }
  }

  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ title: "", headerShown: false }}>
            {console.log('in render')}
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
              <Stack.Screen
                name="ShowSavings"
                component={ShowSavings}
                options={{title: 'Savings'}}
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

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: (token, navigation) => dispatch(loginUser(token, navigation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
