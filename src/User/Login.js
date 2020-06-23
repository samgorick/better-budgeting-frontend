import React from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {loginUser} from './actions';

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
        <Text>BETTER BUDGETING</Text>
        <TextInput
          name="email"
          placeholder="Enter email..."
          onChange={this.handleEmail}
          value={this.state.email}
        />
        <TextInput
          name="password"
          placeholder="Enter Password"
          secureTextEntry={true}
          onChange={this.handlePassword}
        />
        <Button title="LOGIN" onPress={this.handleLogin} />
        <Button title="SIGNUP" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    loginUser: username => dispatch(loginUser(username)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
