import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {addTransaction} from '../actions';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {Form, Item, Picker, Icon, Text} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../../Styles/styles';
import numeral from 'numeral'

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    addTransaction: (transaction, navigation) =>
      dispatch(addTransaction(transaction, navigation)),
  };
};

class AddTransaction extends React.Component {
  state = {
    merchant: '',
    category: '',
    amount: '',
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

  handleCategory = e => {
    this.setState({
      category: e.nativeEvent.text,
    });
  };

  handleSubmit = () => {
    const txnObj = {...this.state, user_id: this.props.user.id};
    this.props.addTransaction(txnObj, this.props.navigation);
    this.setState({
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
            source={{uri: 'https://img.icons8.com/ios/50/000000/shop.png'}}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            name="amount"
            placeholder="Enter Amount..."
            onChange={this.handleAmount}
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
              placeholder="Select a category..."
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({category: itemValue})
              }>
              {SpendingCategories.map(cat => (
                <Picker.Item label={cat} value={cat} />
              ))}
            </Picker>
          </Item>
        </Form>
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTransaction);
