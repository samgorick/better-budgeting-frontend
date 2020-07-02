import React from 'react';
import {SafeAreaView, View, TextInput, Image, Text} from 'react-native';
import styles from '../../Styles/styles'
import {connect} from 'react-redux';
import {loginUser} from './actions';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LottieView from 'lottie-react-native';

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

  componentDidMount() {
    this.animation.play();
  }
  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>BETTER BUDGETING</Text>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={styles.animation}
          source={require('./appLogo.json')}
        />
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
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
            style={styles.input}
            name="password"
            placeholder="Enter Password"
            secureTextEntry={true}
            onChange={this.handlePassword}
          />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={{marginTop: 20, textTransform: 'uppercase', color: '#00b5ec'}}>New User? Sign up here</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);


