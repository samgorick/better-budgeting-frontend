import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {AllCategories} from '../../constants/AllCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Form, Item, Picker, Icon, Text} from 'native-base';
import {editBudget} from '../actions';
import styles from '../../../Styles/styles';
import numeral from 'numeral';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    const update = {...this.state, amount: numeral(this.state.amount).value()}
    this.props.editBudget(update, this.props.navigation);
    this.setState({
      id: '',
      category: '',
      amount: '',
    });
  };

  componentDidMount() {
    const bills = this.props.budget.find(
      cat => cat.spending_category === 'Bills',
    );
    const {id, spending_category, amount} = bills;
    this.setState({
      id: id,
      category: spending_category,
      amount: numeral(amount).format('$0,0'),
    });
  }

  handleAmount = e => {
    this.setState({
      amount: numeral(e.nativeEvent.text).format('$0,0'),
    });
  };

  remaining = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const income = this.props.budget.find(
      budg => budg.spending_category === 'Income',
    );
    const spendingBudget = this.props.budget.filter(
      cat => cat.spending_category !== 'Income',
    );
    const total = spendingBudget.map(budg => budg.amount).reduce(reducer);

    return income.amount - total;
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{...styles.container}}>
      <View style={{...styles.container, justifyContent: 'center'}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            name="amount"
            placeholder="Enter Amount..."
            onChange={this.handleAmount}
            keyboardType="numeric"
            value={this.state.amount}
          />
          <Image
            style={styles.inputIcon}
            source={require('../../../Assets/money-icon.png')}
          />
        </View>
        <Form>
          <Item picker>
            <Picker
              style={styles.picker}
              textStyle={{ color: "#235789" }}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" style={{color: '#235789'}}/>}
              itemTextStyle={{ color: '#235789' }}
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => {
                const match = this.props.budget.find(
                  cat => cat.spending_category === itemValue,
                );
                this.setState({
                  id: match.id,
                  category: itemValue,
                  amount: numeral(match.amount).format('$0,0'),
                });
              }}>
              {AllCategories.map(cat => (
                <Picker.Item label={cat} value={cat} style={{color: 'blue'}}/>
              ))}
            </Picker>
          </Item>
        </Form>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.updateBudget}>
          <Text style={styles.buttonText}>Update Budget</Text>
        </TouchableOpacity>
        <Text style={styles.chartHeader}>
          {numeral(this.remaining()).format('$0,0')} income still to assign
        </Text>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBudget);
