import React from 'react';
import {View, Text, TextInput, Switch, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {IncomeCategories} from '../../constants/IncomeCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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

  constructor(){
    super()
    this.state = {
      isEnabled: false
    }
  }
  
  createBudget = values => {
    const budgetObj = {budget: values, user_id: this.props.user.id};
    this.props.addBudget(budgetObj, this.props.navigation);
  };

 toggleSwitch = () => this.setState({isEnabled: !this.state.isEnabled})

  render() {
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <Formik
            initialValues={{
              Income: '0',
              Bills: '0',
              Dining: '0',
              Groceries: '0',
              Holiday: '0',
              Housing: '0',
              Leisure: '0',
              Personal: '0',
              Savings: '0',
              Shopping: '0',
              Transport: '0',
            }}
            onSubmit={values => this.createBudget(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View style={{...styles.container, justifyContent: 'center'}}>
                <Text style={styles.chartHeader}>Set up template budget?</Text>
                <Switch 
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}/>
                {IncomeCategories.map((category, index) => {
                  return (
                    <View key={index}>
                      <Text
                        style={{
                          ...styles.chartHeader,
                          marginTop: 10,
                          marginBottom: 5,
                        }}>
                        {category}
                      </Text>
                      <TextInput
                        onChangeText={handleChange(`${category}`)}
                        onBlur={handleBlur(`${category}`)}
                        value={values[category]}
                        placeholder={`Enter ${category}...`}
                        style={styles.inputContainer}
                      />
                    </View>
                  );
                })}
                {SpendingCategories.map((category, index) => {
                  return (
                    <View key={index}>
                      <Text style={{...styles.chartHeader, marginBottom: 5}}>
                        {category}
                      </Text>
                      <TextInput
                        onChangeText={handleChange(`${category}`)}
                        onBlur={handleBlur(`${category}`)}
                        value={values[category]}
                        placeholder={`Enter ${category}...`}
                        style={styles.inputContainer}
                      />
                    </View>
                  );
                })}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Add Budget</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBudget);
