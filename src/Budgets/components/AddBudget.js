import React from 'react';
import {View, Text, Button, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {IncomeCategories} from '../../constants/IncomeCategories';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import {addBudget} from '../actions';
import styles from '../../../Styles/styles';

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    addBudget: (budgetObj, navigation) =>
      dispatch(addBudget(budgetObj, navigation)),
  };
};

class AddBudget extends React.Component {
  createBudget = values => {
    const budgetObj = {budget: values, user_id: this.props.user.id};
    this.props.addBudget(budgetObj, this.props.navigation);
  };

  render() {
    return (
      <ScrollView>
        <Formik
          initialValues={{
            Income: '',
            Bills: '',
            Dining: '',
            Groceries: '',
            Holiday: '',
            Housing: '',
            Leisure: '',
            Personal: '',
            Savings: '',
            Shopping: '',
            Transport: '',
          }}
          onSubmit={values => this.createBudget(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={{...styles.container, justifyContent: 'center'}}>
              {IncomeCategories.map(category => {
                return (
                  <>
                    <Text style={{...styles.chartHeader, marginTop: 10, marginBottom: 5}}>{category}</Text>
                    <TextInput
                      onChangeText={handleChange(`${category}`)}
                      onBlur={handleBlur(`${category}`)}
                      value={values[category]}
                      placeholder={`Enter ${category}...`}
                      style={styles.inputContainer}
                    />
                  </>
                );
              })}
              {SpendingCategories.map(category => {
                return (
                  <>
                    <Text style={{...styles.chartHeader, marginBottom: 5}}>{category}</Text>
                    <TextInput
                      onChangeText={handleChange(`${category}`)}
                      onBlur={handleBlur(`${category}`)}
                      value={values[category]}
                      placeholder={`Enter ${category}...`}
                      style={styles.inputContainer}
                    />
                  </>
                );
              })}
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Add Budget</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView> 
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBudget);
