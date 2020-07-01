import React from 'react';
import {View, Text, Button, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Picker} from 'react-native';
import { editBudget } from '../actions'
import styles from '../../../Styles/styles'

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
      <View style={{...styles.container, justifyContent: 'center'}}>
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
            style={styles.input}
            name="amount"
            placeholder="Enter Amount..."
            onChange={this.handleAmount}
            keyboardType='numeric'
            value={this.state.amount}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/ios/50/000000/money.png'}}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.updateBudget}>
          <Text style={styles.buttonText}>Update Budget</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBudget);