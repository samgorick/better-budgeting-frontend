import React from 'react';
import {View, TextInput, Image, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {SavingsCategories} from '../../constants/SavingsCategories';
import {Text, Form, Item, Picker, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {addSaving} from '../actions';
import styles from '../../../Styles/styles';

class AddSavings extends React.Component {
  
  createSavings = values => {
    const savingsObj = {...values, user_id: this.props.user.id};
    this.props.addSaving(savingsObj, this.props.navigation);
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          category: 'pension',
          balance: '',
        }}
        onSubmit={values => this.createSavings(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <SafeAreaView style={{...styles.container, justifyContent: 'center'}}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Enter savings pot name..."
                style={styles.input}
              />
              <Image
                style={styles.inputIcon}
                source={require('../../../Assets/savings-pot-icon.png')}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('balance')}
                onBlur={handleBlur('balance')}
                value={values.balance}
                placeholder="Enter balance..."
                keyboardType="numeric"
                style={styles.input}
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
                  textStyle={{color: '#235789'}}
                  iosIcon={
                    <Icon name="arrow-down" style={{color: '#235789'}} />
                  }
                  itemTextStyle={{color: '#235789'}}
                  placeholder="Select a category..."
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}>
                  {SavingsCategories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                  ))}
                </Picker>
              </Item>
            </Form>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Savings</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </Formik>
    );
  }
}

export default connect(state => ({user: state.user}),
  {addSaving},
)(AddSavings);
