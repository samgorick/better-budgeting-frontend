import React from 'react';
import {View, Text, Button, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Picker} from 'react-native';
import { editBudget } from '../actions'

const mapStateToProps = state => {
  return {user: state.user, budget: state.budget};
};

const mapDispatchToProps = dispatch => {
  return {
    editBudget: (budgetObj, navigation) =>
      dispatch(editBudget(budgetObj, navigation)),
  };
};

class EditBudget extends React.Component {

  state = {
    id: '',
    category: '',
    amount: '',
  }; 

  updateBudget = () => {
    this.props.editBudget(this.state, this.props.navigation)
    this.setState({
      id: '',
      category: '',
      amount: ''
    })
  };

  componentDidMount(){
    const bills = this.props.budget.find(cat => cat.spending_category === 'Bills')
    const { id, spending_category, amount } = bills
    this.setState({
      id: id,
      category: spending_category,
      amount: amount.toString()
    })
  }

  handleAmount = e => {
    this.setState({
      amount: e.nativeEvent.text,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Update Budget</Text>
        <View>
          <Text style={{textAlign: 'center'}}>Select Category...</Text>
          <Picker
            selectedValue={this.state.category}
            style={{width: 200}}
            itemStyle={{fontSize:16}}
            onValueChange={(itemValue, itemIndex) => {
              const match = this.props.budget.find(cat => cat.spending_category === itemValue)
              this.setState({id: match.id, category: itemValue, amount: match.amount.toString()})
              }
            }
            >
            {SpendingCategories.map(cat => (
              <Picker.Item label={cat} value={cat} />
            ))}
          </Picker>
          </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            name="amount"
            placeholder="Enter Amount..."
            onChange={this.handleAmount}
            keyboardType='numeric'
            value={this.state.amount}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.updateBudget}>
          <Text style={styles.btnText}>Update Budget</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBudget);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },

  header: {
    fontSize: 45,
    marginBottom: 100,
    textAlign: 'center',
  },
  dropdownContainer: {
    borderColor: 'black',
    borderWidth: 1
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
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});