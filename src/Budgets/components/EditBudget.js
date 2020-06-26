import React from 'react';
import {View, Text, Button, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import { addBudget } from '../actions'

// const mapStateToProps = state => {
//   return {user: state.user};
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addBudget: (budgetObj, navigation) =>
//       dispatch(addBudget(budgetObj, navigation)),
//   };
// };

class EditBudget extends React.Component {

  // createBudget = (values) => {
  //   const budgetObj = {budget: values, user_id: this.props.user.id}
  //   this.props.addBudget(budgetObj, this.props.navigation)
  // };

  render() {
    return (
      <Text>Edit page!</Text>
      
    );
  }
}

export default connect(
)(EditBudget);

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