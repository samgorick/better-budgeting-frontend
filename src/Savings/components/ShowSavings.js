import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {
  Container,
  Content,
  Separator,
  ListItem,
  Body,
  Right,
} from 'native-base';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory-native';
import {updateSavingValue} from '../actions';
import styles from '../../../Styles/styles';
import numeral from 'numeral';

const mapDispatchToProps = dispatch => {
  return {
    updateSavingValue: (savingObj, navigation) =>
      dispatch(updateSavingValue(savingObj, navigation)),
  };
};

class ShowSavings extends React.Component {
  state = {
    id: '',
    amount: '',
  };

  componentDidMount() {
    const {id, saving_values} = this.props.route.params.item;
    this.setState({
      id: id,
      amount: this.findFirst(saving_values).value.toString(),
    });
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
      amount: '',
    });
  };

  render() {
    const {name, saving_category, saving_values} = this.props.route.params.item;

    return (
      <Container style={styles.nativeContainer}>
        <Fab
          style={{backgroundColor: 'transparent'}}
          position={'topLeft'}
          onPress={() => this.props.navigation.navigate('Savings')}>
          <Text style={{color: 'gray', marginTop: 20}}>Back</Text>
        </Fab>
        <Content>
          <Text style={styles.header}>{`${name}\n (${saving_category})`}</Text>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              data={this.getData(saving_values)}
            />
          </VictoryChart>
          <Separator>
            <Text>Latest Value:</Text>
          </Separator>
          <ListItem>
            <Body>
              <Text>
                {moment(this.findFirst(saving_values).created_at).format(
                  'MMM Do',
                )}
              </Text>
            </Body>
            <Right>
              <Text>
                {numeral(this.findFirst(saving_values).value).format('$0,0')}
              </Text>
            </Right>
          </ListItem>
          <Separator>
            <Text>Previous Values:</Text>
          </Separator>
          {this.findPrevious(saving_values).map(saving => (
            <ListItem>
              <Body>
                <Text>{moment(saving.created_at).format('MMM Do')}</Text>
              </Body>
              <Right>
                <Text>{numeral(saving.value).format('$0,0')}</Text>
              </Right>
            </ListItem>
          ))}
          <Separator>
            <Text>Update Savings Value:</Text>
          </Separator>
          <View style={{...styles.container, marginTop: 25}}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                name="amount"
                onChange={this.handleAmount}
                value={this.state.amount}
              />
              <Image
                style={styles.inputIcon}
                source={{uri: 'https://img.icons8.com/ios/50/000000/money.png'}}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Update Savings Value</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(ShowSavings);
