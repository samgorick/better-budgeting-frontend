import React from 'react';
import {View, TextInput, Image, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from './actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: userObj => dispatch(signUpUser(userObj)),
  };
};

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
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

  handlePasswordConfirmation = e => {
    this.setState({
      passwordConfirmation: e.nativeEvent.text,
    });
  };

  handleSignup = () => {
    if (this.state.password === this.state.passwordConfirmation) {
      this.props.signUpUser({
        email: this.state.email,
        password: this.state.password,
      });
    } else {
      alert('Sorry, password does not match.');
    }
    this.setState({
      username: '',
      password: '',
      passwordConfirmation: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>BETTER BUDGETING</Text>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            name="password confirmation"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChange={this.handlePasswordConfirmation}
          />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={this.handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.btnText}>I've already signed up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  header: {
    fontSize: 45,
    marginBottom: 100,
    textAlign: 'center'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  signupText: {
    color: 'white',
    textTransform: 'uppercase'
  },
  btnText:{
    color:"white",
    fontWeight:'bold'
  }
});

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
