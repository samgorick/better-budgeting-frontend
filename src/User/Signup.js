import React from 'react';
import {View, TextInput, Image, SafeAreaView, Text} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from './actions';
import styles from '../../Styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import {Formik} from 'formik';

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: userObj => dispatch(signUpUser(userObj)),
  };
};

class Signup extends React.Component {


  handleSignup = values => {
    console.log(values)
    this.props.signUpUser(values, this.props.navigation);
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
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={styles.animation}
            source={require('./appLogo.json')}
          />
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            onSubmit={values => this.handleSignup(values)}>
            {({handleChange, handleSubmit, values}) => (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    name="email"
                    placeholder="Enter email..."
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri: 'https://img.icons8.com/nolan/40/000000/email.png',
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    name="password"
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                  />
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri: 'https://img.icons8.com/nolan/40/000000/key.png',
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={handleChange('passwordConfirmation')}
                  />
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri: 'https://img.icons8.com/nolan/40/000000/key.png',
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.loginButtonContainer}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.signupText}>Signed up already?</Text>
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

{
  /* <SafeAreaView style={styles.container}>
<KeyboardAwareScrollView contentContainerStyle={styles.container}>
  <LottieView
    ref={animation => {
      this.animation = animation;
    }}
    style={styles.animation}
    source={require('./appLogo.json')}
  />
  <Formik
    initialValues={{
      email: '',
      password: '',
      passwordConfirmation: '',
    }}
    onSubmit={values => this.loginUser(values)}
  />
  {this.state.email.length === 0 ? (
    <Text style={{...styles.chartHeader, color: 'red'}}>
      Email cannot be blank
    </Text>
  ) : null}
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
    <Image
      style={styles.inputIcon}
      source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
    />
  </View>
  {this.state.password.length === 0 ? (
    <Text style={{...styles.chartHeader, color: 'red'}}>
      Password cannot be blank
    </Text>
  ) : null}
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      name="password"
      placeholder="Enter Password"
      secureTextEntry={true}
      onChange={this.handlePassword}
    />
    <Image
      style={styles.inputIcon}
      source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
    />
  </View>
  {this.state.password !== this.state.passwordConfirmation ? (
    <Text style={{...styles.chartHeader, color: 'red'}}>
      Password must match
    </Text>
  ) : null}
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      name="password confirmation"
      placeholder="Confirm Password"
      secureTextEntry={true}
      onChange={this.handlePasswordConfirmation}
    />
    <Image
      style={styles.inputIcon}
      source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
    />
  </View>
  <TouchableOpacity
    style={styles.loginButtonContainer}
    onPress={this.handleSignup}
    disabled={
      this.state.password === this.state.passwordConfirmation &&
      this.state.password.length > 0
        ? false
        : true
    }>
    <Text style={styles.buttonText}>Sign Up</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => this.props.navigation.navigate('Login')}>
    <Text style={styles.signupText}>Signed up already?</Text>
  </TouchableOpacity>
</KeyboardAwareScrollView>
</SafeAreaView> */
}
