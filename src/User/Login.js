import React from 'react';
import {SafeAreaView, View, TextInput, Image, Text} from 'react-native';
import styles from '../../Styles/styles';
import {connect} from 'react-redux';
import {loginUser} from './actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import {Formik} from 'formik';

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, navigation) => dispatch(loginUser(username, navigation)),
  };
};

const mapStateToProps = state => {
  return { error: state.error}
}

class Login extends React.Component {

  loginUser = values => {
    this.props.loginUser(values, this.props.navigation);
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
            }}
            onSubmit={values => this.loginUser(values)}>
            {({handleChange, handleSubmit, values}) => (
              <>
              {this.props.error ? <Text style={{...styles.chartHeader, color: 'red'}}>{this.props.error}</Text> : null}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    name="email"
                    placeholder="Enter email..."
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange(`email`)}
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
                    onChangeText={handleChange(`password`)}
                  />
                  <Image
                    style={styles.inputIcon}
                    source={{
                      uri: 'https://img.icons8.com/nolan/40/000000/key.png',
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={
                    values.email && values.password ? false : true }
                  style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text
              style={{
                marginTop: 20,
                textTransform: 'uppercase',
                color: '#00b5ec',
              }}>
              New User? Sign up here
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
