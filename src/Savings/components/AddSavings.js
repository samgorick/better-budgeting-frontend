import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {connect} from 'react-redux';
import {SavingsCategories} from '../../constants/SavingsCategories';
import {Form, Item, Picker, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {addSaving} from '../actions';
import styles from '../../../Styles/styles';

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    addSaving: (saving, navigation) => dispatch(addSaving(saving, navigation)),
  };
};

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
          <View style={{...styles.container, justifyContent: 'center'}}>
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
                source={{uri: 'https://img.icons8.com/ios/50/000000/document-header.png'}}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('balance')}
                onBlur={handleBlur('balance')}
                value={values.balance}
                placeholder="Enter balance..."
                style={styles.input}
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
                  selectedValue={values.category}
                  onValueChange={handleChange('category')}>
                  {SavingsCategories.map(cat => (
                    <Picker.Item label={cat} value={cat} />
                  ))}
                </Picker>
              </Item>
            </Form>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Savings</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddSavings);
