import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import { SavingsCategories } from '../../constants/SavingsCategories'
import {Picker} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {addSaving} from '../actions'

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    addSaving: (saving, navigation) =>
      dispatch(addSaving(saving, navigation)),
  };
};

class AddSavings extends React.Component {

  createSavings = (values) => {
    const savingsObj = {...values, user_id: this.props.user.id};
    this.props.addSaving(savingsObj, this.props.navigation);
  };

  render() {
    return (
      <Formik initialValues={{
        name: '',
        category: 'pension',
        balance: ''
      }}
      onSubmit={values => this.createSavings(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.container}>
        <Text style={styles.header}>Add Savings</Text>
        <View style={styles.inputContainer}>
        <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Enter name..."
            style={styles.inputContainer}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={handleChange('balance')}
            onBlur={handleBlur('balance')}
            value={values.balance}
            placeholder="Enter balance..."
            style={styles.inputContainer}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>Select Category...</Text>
          <Picker
            selectedValue={values.category}
            style={{width: 200}}
            itemStyle={{fontSize: 16}}
            onValueChange={handleChange('category')}
            >
              <Picker.Item label={"Choose a category"} value={"Choose a category"}/>
            {SavingsCategories.map(cat => (
              <Picker.Item label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={handleSubmit}>
          <Text style={styles.btnText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
      )}
      </Formik>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(AddSavings);

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
    borderWidth: 1,
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