import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {editTransaction, deleteTransaction} from '../actions';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Form, Item, Picker, Icon, Text} from 'native-base';
import styles from '../../../Styles/styles'

class EditTransaction extends React.Component {
  state = {
    id: '',
    merchant: '',
    category: '',
    amount: '',
  };

  componentDidMount() {
    const {
      id,
      merchant,
      spending_category,
      amount,
    } = this.props.route.params.item;
    this.setState({
      id: id,
      merchant: merchant,
      category: spending_category,
      amount: amount.toString(),
    });
  }

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

  handleDelete = () => {
    this.props.deleteTransaction(this.state.id, this.props.navigation);
  };

  handleSubmit = () => {
    const txnObj = {...this.state, user_id: this.props.user.id};
    this.props.editTransaction(txnObj, this.props.navigation);
    this.setState({
      id: '',
      merchant: '',
      category: '',
      amount: '',
    });
  };

  render() {
    return (
      <View style={{...styles.container, justifyContent: 'center'}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            name="merchant"
            placeholder="Enter merchant..."
            onChange={this.handleMerchant}
            value={this.state.merchant}
          />
          <Image
            style={styles.inputIcon}
            source={require('../../../Assets/shop-icon.png')}
          />
        </View>
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
              mode="dropdown"
              textStyle={{ color: "#235789" }}
              iosIcon={<Icon name="arrow-down" style={{color: '#235789'}}/>}
              itemTextStyle={{ color: '#235789' }}
              placeholder="Select a category..."
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#bfc6ea"
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({category: itemValue})
              }>
              {SpendingCategories.map((category, index) => (
                <Picker.Item key={index} label={category} value={category} />
              ))}
            </Picker>
          </Item>
        </Form>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Update Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.negativeButtonContainer}
          onPress={this.handleDelete}>
          <Text style={styles.buttonText}>Delete Transaction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {editTransaction, deleteTransaction},
)(EditTransaction);
