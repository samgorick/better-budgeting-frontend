import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {editTransaction, deleteTransaction} from '../actions';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Form, Item, Picker, Icon} from 'native-base';
import styles from '../../../Styles/styles';

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    editTransaction: (transaction, navigation) =>
      dispatch(editTransaction(transaction, navigation)),
    deleteTransaction: (transactionId, navigation) =>
      dispatch(deleteTransaction(transactionId, navigation)),
  };
};

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
            source={{uri: 'https://img.icons8.com/ios/50/000000/shop.png'}}
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
              placeholderIconColor="#bfc6ea"
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
          style={styles.buttonContainer}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Update Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.buttonContainer, backgroundColor: 'red'}}
          onPress={this.handleDelete}>
          <Text style={styles.buttonText}>Delete Transaction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTransaction);
