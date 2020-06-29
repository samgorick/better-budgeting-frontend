import React from 'react';
import {View, Text, Button, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import { addBudget } from '../actions'

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

  createBudget = (values) => {
    const budgetObj = {budget: values, user_id: this.props.user.id}
    this.props.addBudget(budgetObj, this.props.navigation)
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
          <View>
          <Text>Income</Text>
          <TextInput
            onChangeText={handleChange('Income')}
            onBlur={handleBlur('Income')}
            value={values.Income}
            placeholder="Enter Income..."
            style={styles.inputContainer}
          />
          <Text>Bills</Text>
          <TextInput
            onChangeText={handleChange('Bills')}
            onBlur={handleBlur('Bills')}
            value={values.Bills}
            placeholder="Enter Bills..."
            style={styles.inputContainer}
          />
          <Text>Dining</Text>
          <TextInput
            onChangeText={handleChange('Dining')}
            onBlur={handleBlur('Dining')}
            value={values.Dining}
            placeholder="Enter Dining..."
            style={styles.inputContainer}
          />
          <Text>Groceries</Text>
          <TextInput
            onChangeText={handleChange('Groceries')}
            onBlur={handleBlur('Groceries')}
            value={values.Groceries}
            placeholder="Enter Groceries..."
            style={styles.inputContainer}
          />
          <Text>Holiday</Text>
          <TextInput
            onChangeText={handleChange('Holiday')}
            onBlur={handleBlur('Holiday')}
            value={values.Holiday}
            placeholder="Enter Holiday..."
            style={styles.inputContainer}
          />
          <Text>Housing</Text>
          <TextInput
            onChangeText={handleChange('Housing')}
            onBlur={handleBlur('Housing')}
            value={values.Housing}
            placeholder="Enter Housing..."
            style={styles.inputContainer}
          />
          <Text>Leisure</Text>
          <TextInput
            onChangeText={handleChange('Leisure')}
            onBlur={handleBlur('Leisure')}
            value={values.Leisure}
            placeholder="Enter Leisure..."
            style={styles.inputContainer}
          />
          <Text>Personal</Text>
          <TextInput
            onChangeText={handleChange('Personal')}
            onBlur={handleBlur('Personal')}
            value={values.Personal}
            placeholder="Enter Personal Spend..."
            style={styles.inputContainer}
          />
          <Text>Savings</Text>
          <TextInput
            onChangeText={handleChange('Savings')}
            onBlur={handleBlur('Savings')}
            value={values.Savings}
            placeholder="Enter Savings..."
            style={styles.inputContainer}
          />
          <Text>Shopping</Text>
          <TextInput
            onChangeText={handleChange('Shopping')}
            onBlur={handleBlur('Shopping')}
            value={values.Shopping}
            placeholder="Enter Shopping..."
            style={styles.inputContainer}
          />
          <Text>Transport</Text>
          <TextInput
            onChangeText={handleChange('Transport')}
            onBlur={handleBlur('Transport')}
            value={values.Transport}
            placeholder="Enter Transport..."
            style={styles.inputContainer}
          />
          <Button onPress={handleSubmit} title="Submit" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 45,
    marginBottom: 100,
    textAlign: 'center',
  },
  category: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'left',
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
