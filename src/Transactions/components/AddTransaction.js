import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {addTransaction} from '../actions';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {Form, Item, Picker, Icon, Text} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../../Styles/styles';
import {Formik} from 'formik';
import * as Yup from 'yup';

const AddBudgetSchema = Yup.object().shape({
  merchant: Yup.string()
    .required('Merchant cannot be blank'),
  amount: Yup.string()
    .required('Amount cannot be blank')
    .matches(/^\d+(\.\d{1,2})?$/, 'Must be a valid number'),
  category: Yup.string()
    .required('Category cannot be blank')
});

class AddTransaction extends React.Component {
  createTransaction = values => {
    const txnObj = {...values, user_id: this.props.user.id};
    this.props.addTransaction(txnObj, this.props.navigation);
  };

  render() {
    return (
      <Formik
        initialValues={{
          merchant: '',
          category: '',
          amount: ''
        }}
        validationSchema={AddBudgetSchema}
        onSubmit={values => this.createTransaction(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View style={{...styles.container, justifyContent: 'center'}}>
            {errors.merchant && touched.merchant ? (
              <Text style={styles.error}>{errors.merchant}</Text>
              ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                name="merchant"
                placeholder="Enter merchant..."
                onChangeText={handleChange('merchant')}
                onBlur={handleBlur('merchant')}
                value={values.merchant}
              />
              <Image style={styles.inputIcon} source={require('../../../Assets/shop-icon.png')} />
            </View>
            {errors.amount && touched.amount ? (
              <Text style={styles.error}>{errors.amount}</Text>
              ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                name="amount"
                placeholder="Enter Amount..."
                keyboardType="numeric"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
              />
              <Image style={styles.inputIcon} source={require('../../../Assets/money-icon.png')} />
            </View>
            <Form>
            {errors.category && touched.category ? (
              <Text style={styles.error}>{errors.category}</Text>
              ) : null}
              <Item picker>
                <Picker
                  style={styles.picker}
                  name="category"
                  mode="dropdown"
                  textStyle={{color: '#235789'}}
                  iosIcon={<Icon name="arrow-down" style={{color: '#235789'}} />}
                  itemTextStyle={{color: '#235789'}}
                  placeholder="Select a category..."
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}>
                  {SpendingCategories.map((cat, index) => (
                    <Picker.Item key={index} label={cat} value={cat} />
                  ))}
                </Picker>
              </Item>
            </Form>
            <TouchableOpacity style={[styles.buttonContainer]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {addTransaction}
)(AddTransaction);
