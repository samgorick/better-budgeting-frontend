import React from 'react';
import {View, TextInput, Image} from 'react-native';
import {
  Container,
  Content,
  Separator,
  ListItem,
  Body,
  Right, Text
} from 'native-base';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {VictoryChart, VictoryLine, VictoryTheme, VictoryAxis} from 'victory-native';
import {updateSavingValue} from '../actions';
import styles from '../../../Styles/styles';
import numeral from 'numeral';

class ShowSavings extends React.Component {
  state = {
    id: '',
    value: '',
  };

  componentDidMount() {
    const {id, saving_values} = this.props.route.params.item;
    this.setState({
      id: id,
      value: numeral(this.findFirst(saving_values).value).format('$0,0'),
    });
  }

  // Helper method returns saving values in date order
  order = values => {
    return values.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  };

  // Returns most recent savings value
  findFirst = values => {
    return this.order(values)[0];
  };

  // Returns all savings values except most recent
  findPrevious = values => {
    return this.order(values).slice(1);
  };

  // Returns data for line graph of values over time
  getData = values => {
    const ordered = values.sort((a, b) =>
      a.created_at > b.created_at ? 1 : -1,
    );
    return ordered.map(value => ({
      x: moment(value.created_at).format('MMM Do'),
      y: value.value,
    }));
  };

  handleValue = e => {
    this.setState({
      value: numeral(e.nativeEvent.text).format('$0,0'),
    });
  };

  handleSubmit = () => {
    const value = {saving_id: this.state.id, value: numeral(this.state.value).value()}
    this.props.updateSavingValue(value, this.props.navigation);
    this.setState({
      id: '',
      value: '',
    });
  };

  render() {
    const {name, saving_category, saving_values} = this.props.route.params.item;

    return (
      <Container style={styles.nativeContainer}>
        <Content>
          <Text style={styles.header}>{`${name}\n (${saving_category})`}</Text>
          <VictoryChart theme={VictoryTheme.material}
          padding={{left: 60, right: 25, bottom: 40}}>
          <VictoryAxis/>
          <VictoryAxis dependentAxis 
          tickFormat={x => numeral(x).format('$0,0')}/> 
            <VictoryLine
              style={{
                data: {stroke: '#235789'},
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
              <Text style={styles.listAmount}>
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
                <Text style={styles.listAmount}>
                  {numeral(saving.value).format('$0,0')}
                </Text>
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
                name="value"
                keyboardType="numeric"
                onChange={this.handleValue}
                value={this.state.value}
              />
              <Image
                style={styles.inputIcon}
                source={require('../../../Assets/money-icon.png')}
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
  {updateSavingValue},
)(ShowSavings);
