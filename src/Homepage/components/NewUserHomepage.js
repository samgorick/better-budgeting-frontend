import React from 'react';
import {Content, Text} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import styles from '../../../Styles/styles';

const mapStateToProps = state => {
  return {transactions: state.transactions, budget: state.budget, savings: state.savings};
};

// Shows key actions for new user to complete to get value from app - add budget, add transaction, add saving
// Once action has been completed, option to complete is greyed out
class NewUserHomepage extends React.Component {
  render() {
    return (
      <Content contentContainerStyle={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.chartHeader}>Get started by clicking an option below:</Text>
        {this.props.budget.length === 0 ? (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Add Budget')}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add Budget</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true} style={styles.disabledButton}>
            <Text style={styles.buttonText}>Budget Added</Text>
          </TouchableOpacity>
        )}
        {this.props.transactions.length === 0 ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Transactions', {screen: 'AddTransaction'})
            }
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add Transaction</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true} style={styles.disabledButton}>
            <Text style={styles.buttonText}>Transaction Added</Text>
          </TouchableOpacity>
        )}
        {this.props.savings.length === 0 ? (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Savings', {screen: 'AddSavings'})}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add Savings</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true} style={styles.disabledButton}>
            <Text style={styles.buttonText}>Saving Added</Text>
          </TouchableOpacity>
        )}
      </Content>
    );
  }
}

export default connect(mapStateToProps)(NewUserHomepage);
