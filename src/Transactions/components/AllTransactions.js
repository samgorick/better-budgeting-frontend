import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Transaction from './Transaction';
import {TouchableOpacity} from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return {transactions: state.user.transactions};
};

class AllTransactions extends React.Component {
  render() {
    return (
        <View style={styles.container}>
        <Text>All Transactions!</Text>
        {this.props.transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('AddTransaction')}>
          <Text style={styles.buttonText}>Add Transaction</Text>
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
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps)(AllTransactions);
