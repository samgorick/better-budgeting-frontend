import React from 'react';
import {View, TextInput, Image, SafeAreaView, Text} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from './actions';
import styles from '../../Styles/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LottieView from 'lottie-react-native';

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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            name="password confirmation"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChange={this.handlePasswordConfirmation}
          />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={this.handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{marginTop: 20, textTransform: 'uppercase', color: '#00b5ec'}}>I've already signed up</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
