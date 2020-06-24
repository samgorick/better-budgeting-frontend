import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import addTransaction from '../actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-material-dropdown';

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: transaction => dispatch(addTransaction(transaction)),
  };
};

class AddTransaction extends React.Component {
  state = {
    merchant: '',
    category: null,
    amount: 0,
  };

  handleMerchant = e => {
    this.setState({
      merchant: e.nativeEvent.text,
    });
  };

  handleAmount = e => {
    this.setState({
      amount: e.nativeEvent.text,
    });
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add Transaction</Text>
        <View style={styles.inputContainer}>
          <Text>Merchant</Text>
          <TextInput
            style={styles.inputs}
            name="merchant"
            placeholder="Enter merchant..."
            onChange={this.handleMerchant}
            value={this.state.merchant}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Amount ($)</Text>
          <TextInput
            style={styles.inputs}
            name="amount"
            placeholder="Enter Amount"
            onChange={this.handleAmount}
            value={this.state.amount}
          />
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.handleSubmit}>
          <Text style={styles.loginText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddTransaction);

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
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
