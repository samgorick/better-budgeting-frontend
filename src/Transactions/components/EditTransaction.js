import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import editTransaction from '../actions';
import {Picker} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return { user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    editTransaction: (transaction, navigation) => dispatch(editTransaction(transaction, navigation)),
  };
};

class EditTransaction extends React.Component {

  state = {
    id: '',
    merchant: '',
    category: '',
    amount: 0,
  }; 

  componentDidMount(){
    const { id, merchant, spending_category, amount } = this.props.route.params.item;
    this.setState({
      id: id,
      merchant: merchant,
      category: spending_category,
      amount: amount.toString()
    })
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

  handleCategory = e => {
    this.setState({
      category: e.nativeEvent.text
    });
  };

  handleSubmit = () => {
    const txnObj = {...this.state, user_id: this.props.user.id}
    this.props.addTransaction(txnObj, this.props.navigation)
    this.setState({
      merchant: '',
      category: '',
      amount: ''
    })
  };

  render() {
    console.log(this.state)
    console.log(this.props.route.params.item)
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Update Transaction</Text>
        <View style={styles.inputContainer}>
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
        <View>
          <Text style={{textAlign: 'center'}}>Select Category...</Text>
          <Picker
            selectedValue={this.state.category}
            style={{width: 200}}
            itemStyle={{fontSize:16}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue})
            }>
            <Picker.Item label="Bills" value="Bills"/>
            <Picker.Item label="Eating/Drinking Out" value="Eating/Drinking Out" />
            <Picker.Item label="Groceries" value="Groceries" />
            <Picker.Item label="Holiday" value="Holiday" />
            <Picker.Item label="Housing" value="Housing" />
            <Picker.Item label="Leisure" value="Leisure" />
            <Picker.Item label="Personal Care" value="Personal Care" />
            <Picker.Item label="Savings" value="Savings" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Transport" value="Transport" />
          </Picker>
          </View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.handleSubmit}>
          <Text style={styles.loginText}>Update Transaction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTransaction);

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