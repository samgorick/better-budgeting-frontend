import React from 'react';
import {View, TextInput, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {loginUser} from './actions';
import { TouchableOpacity } from 'react-native-gesture-handler'

const mapDispatchToProps = dispatch => {
  return {
    loginUser: username => dispatch(loginUser(username)),
  };
};

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleEmail = e => {
    this.setState({
      email: e.nativeEvent.text,
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.nativeEvent.text,
    });
  };

  handleLogin = () => {
    this.props.loginUser(this.state);
    this.setState({
      username: '',
      password: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>BETTER BUDGETING</Text>
        <Image style={styles.logo} source={require('./logo.png')}></Image>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            name="email"
            placeholder="Enter email..."
            keyboardType="email-address"
            autoCapitalize="none"
            onChange={this.handleEmail}
            value={this.state.email}
          />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            name="password"
            placeholder="Enter Password"
            secureTextEntry={true}
            onChange={this.handlePassword}
          />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.signUpText}>New User? Sign up here</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
  },
  header: {
    textAlign: 'center',
    fontSize: 50,
    marginTop: 10,
    marginBottom: 50,
    color: '#00b5ec'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    width:300,
    height:45,
    marginBottom:25,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 50
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
    width: 300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  signUpText:{
    color: "grey",
    fontWeight:'bold',
    textTransform: 'uppercase'
  }
});
