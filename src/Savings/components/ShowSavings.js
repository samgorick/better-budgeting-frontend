import React from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory-native';
import {updateSavingValue} from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    updateSavingValue: (savingObj, navigation) => dispatch(updateSavingValue(savingObj, navigation)),
  };
};

class ShowSavings extends React.Component {

  state = {
    id: '',
    amount: '',
  };

  componentDidMount(){
    const { id, saving_values } = this.props.route.params.item
    this.setState({
      id: id,
      amount: this.findFirst(saving_values).value.toString()
    })
  }

  order = values => {
    return values.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  };

  findFirst = values => {
    return this.order(values)[0];
  };

  findPrevious = values => {
    return this.order(values).slice(1);
  };

  getData = values => {
    const ordered = values.sort((a, b) =>
      a.created_at > b.created_at ? 1 : -1,
    );
    return ordered.map(value => ({
      x: moment(value.created_at).format('MMM Do'),
      y: value.value,
    }));
  };

  handleAmount = e => {
    this.setState({
      amount: e.nativeEvent.text,
    });
  };

  handleSubmit = () => {
    this.props.updateSavingValue(this.state, this.props.navigation);
    this.setState({
      id: '',
      amount: ''
    });
  };

  render() {
    const {name, saving_category, saving_values} = this.props.route.params.item;

    return (
      <View>
        <Text>{name}</Text>
        <Text>{saving_category}</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: {stroke: '#c43a31'},
              parent: {border: '1px solid #ccc'},
            }}
            data={this.getData(saving_values)}
            // data={[
            //   {x: "May 29th", y: 1000},
            //   {x: "Jun 29th", y: 1500},
            //   {x: "Jul 29th", y: 2000}
            // ]}
          />
        </VictoryChart>
        <Text>Latest Value:</Text>
        <Text>
          {moment(this.findFirst(saving_values).created_at).format('MMM Do')} -
          ${this.findFirst(saving_values).value}
        </Text>
        <Text>Previous Values:</Text>
        {this.findPrevious(saving_values).map(saving => (
          <Text>
            {moment(saving.created_at).format('MMM Do')} - ${saving.value}
          </Text>
        ))}
        <Text>Update Savings Value:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            name="amount"
            onChange={this.handleAmount}
            value={this.state.amount}
          />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.handleSubmit}>
          <Text style={styles.btnText}>Update Savings Value</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(ShowSavings);

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
