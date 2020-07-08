import React from 'react';
import {View, TextInput, Image, SafeAreaView} from 'react-native';
import {Text} from 'native-base'
import {connect} from 'react-redux';
import {signUpUser} from './actions';
import styles from '../../Styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: userObj => dispatch(signUpUser(userObj)),
  };
};

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email cannot be blank'),
  password: Yup.string().required('Password cannot be blank'),
  passwordConfirmation: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

class Signup extends React.Component {
  handleSignup = values => {
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
            validationSchema={SignupSchema}
            onSubmit={values => this.handleSignup(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {errors.email && touched.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    name="email"
                    placeholder="Enter email..."
                    keyboardType="email-address"
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  <Image
                    style={styles.inputIcon}
                    source={require('../../Assets/email-logo.png')}
                    
                  />
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}
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
                    source={require('../../Assets/password-icon.png')}
                  />
                </View>
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <Text style={styles.error}>{errors.passwordConfirmation}</Text>
                ) : null}
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
                    source={require('../../Assets/password-icon.png')}
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