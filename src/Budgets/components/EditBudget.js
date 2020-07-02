import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Form, Item, Picker, Icon, Fab} from 'native-base';
import {editBudget} from '../actions';
import styles from '../../../Styles/styles';

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
    this.props.editBudget(this.state, this.props.navigation);
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
      amount: amount.toString(),
    });
  }

  handleAmount = e => {
    this.setState({
      amount: e.nativeEvent.text,
    });
  };

  render() {
    return (
      <View style={{...styles.container, justifyContent: 'center'}}>
                <Fab
          style={{backgroundColor: 'transparent'}}
          position={'topLeft'}
          onPress={() => this.props.navigation.navigate('Summary')}>
          <Text style={{color: 'gray', marginTop: 20}}>Back</Text>
        </Fab>
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
            source={{uri: 'https://img.icons8.com/ios/50/000000/money.png'}}
          />
        </View>
        <Form>
          <Item picker>
            <Picker
              style={styles.picker}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => {
                const match = this.props.budget.find(
                  cat => cat.spending_category === itemValue,
                );
                this.setState({
                  id: match.id,
                  category: itemValue,
                  amount: match.amount.toString(),
                });
              }}>
              {SpendingCategories.map(cat => (
                <Picker.Item label={cat} value={cat} />
              ))}
            </Picker>
          </Item>
        </Form>
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
