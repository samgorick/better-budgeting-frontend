import React from 'react';
import {View, TextInput, Switch, SafeAreaView, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'native-base';
import {SpendingCategories} from '../../constants/SpendingCategories';
import {IncomeCategories} from '../../constants/IncomeCategories';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {addBudget} from '../actions';
import styles from '../../../Styles/styles';
import numeral from 'numeral';

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    addBudget: (budgetObj, navigation) =>
      dispatch(addBudget(budgetObj, navigation)),
  };
};

const screenWidth = Dimensions.get('window').width;

const AddBudgetSchema = Yup.object().shape({
  Income: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Bills: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Dining: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Groceries: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Holiday: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Housing: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Leisure: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Personal: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Savings: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Shopping: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
  Transport: Yup.string()
    .required('Required')
    .matches(/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/, 'Must be a valid number'),
});

class AddBudget extends React.Component {
  constructor() {
    super();
    this.state = {
      isEnabled: false,
    };
  }

  createBudget = values => {
    values['Income'] = numeral(values['Income']).value();
    values['Bills'] = numeral(values['Bills']).value();
    values['Dining'] = numeral(values['Dining']).value();
    values['Groceries'] = numeral(values['Groceries']).value();
    values['Holiday'] = numeral(values['Holiday']).value();
    values['Housing'] = numeral(values['Housing']).value();
    values['Leisure'] = numeral(values['Leisure']).value();
    values['Personal'] = numeral(values['Personal']).value();
    values['Savings'] = numeral(values['Savings']).value();
    values['Shopping'] = numeral(values['Shopping']).value();
    values['Transport'] = numeral(values['Transport']).value();

    const budgetObj = {budget: values, user_id: this.props.user.id};
    this.props.addBudget(budgetObj, this.props.navigation);
  };

  toggleSwitch = values => {
    if (!this.state.isEnabled) {
      const income = numeral(values['Income']).value();
      values['Bills'] = numeral(income * 0.03).format('$0,0');
      values['Dining'] = numeral(income * 0.05).format('$0,0');
      values['Groceries'] = numeral(income * 0.15).format('$0,0');
      values['Holiday'] = numeral(income * 0.1).format('$0,0');
      values['Housing'] = numeral(income * 0.3).format('$0,0');
      values['Leisure'] = numeral(income * 0.05).format('$0,0');
      values['Personal'] = numeral(income * 0.02).format('$0,0');
      values['Savings'] = numeral(income * 0.1).format('$0,0');
      values['Shopping'] = numeral(income * 0.12).format('$0,0');
      values['Transport'] = numeral(income * 0.08).format('$0,0');
    }
    this.setState({isEnabled: !this.state.isEnabled});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView style={{width: screenWidth}}>
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
            validationSchema={AddBudgetSchema}
            onSubmit={values => this.createBudget(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{...styles.container, justifyContent: 'center'}}>
                <Text style={styles.chartHeader}>Set up template budget?</Text>
                <Switch
                  trackColor={{false: '#E0E0E2', true: '#43C59E'}}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="#E0E0E2"
                  onValueChange={() => this.toggleSwitch(values)}
                  value={this.state.isEnabled}
                />
                {IncomeCategories.map((category, index) => {
                  return (
                    <>
                      <View key={index}>
                        <Text
                          style={{
                            ...styles.chartHeader,
                            marginTop: 10,
                            marginBottom: 5,
                          }}>
                          {category}
                        </Text>
                        {errors[category] && touched[category] ? (
                          <Text style={styles.error}>{errors[category]}</Text>
                        ) : null}
                        <View style={styles.inputContainer}>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange(`${category}`)}
                            onBlur={handleBlur(`${category}`)}
                            value={numeral(values[category]).format('$0,0')}
                            placeholder={`Enter ${category}...`}
                          />
                          <Image
                            style={styles.inputIcon}
                            source={require('../../../Assets/money-icon.png')}
                          />
                        </View>
                      </View>
                    </>
                  );
                })}
                {SpendingCategories.map((category, index) => {
                  return (
                    <View key={index}>
                      <Text style={{...styles.chartHeader, marginBottom: 5}}>
                        {category}
                      </Text>
                      {errors[category] && touched[category] ? (
                        <Text style={styles.error}>{errors[category]}</Text>
                      ) : null}
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          onChangeText={handleChange(`${category}`)}
                          onBlur={handleBlur(`${category}`)}
                          value={numeral(values[category]).format('$0,0')}
                          placeholder={`Enter ${category}...`}
                        />
                        <Image
                          style={styles.inputIcon}
                          source={require('../../../Assets/money-icon.png')}
                        />
                      </View>
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
