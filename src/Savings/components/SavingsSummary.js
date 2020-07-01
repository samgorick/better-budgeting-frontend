import React from 'react';
import {connect} from 'react-redux';
import Saving from './Saving';
import { Dimensions } from 'react-native'
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory-native';
import {Container, Content, List, Fab, Icon, Text} from 'native-base';
import styles from '../../../Styles/styles';
import numeral from 'numeral'

const mapStateToProps = state => {
  return {savings: state.savings};
};

const totalInvested = savings => {
  const totals = savings.map(saving => {
    const order = saving.saving_values.sort((a, b) =>
      a.created_at < b.created_at ? 1 : -1,
    );
    return order[0].value;
  });
  return totals.reduce((acc, curr) => acc + curr);
};

const pieDataCalc = savings => {
  return savings.map(saving => {
    const order = saving.saving_values.sort((a, b) =>
      a.created_at < b.created_at ? 1 : -1,
    );
    const value = numeral(order[0].value).format('$0,0')
    return {x: saving.name, y: value, label: `${saving.name}\n ${value}`};
  });
};

const screenWidth = Dimensions.get('window').width;

class CustomLabel extends React.Component {

  render() {
    return (
      <>
        <VictoryLabel {...this.props}/>
        <VictoryTooltip
          {...this.props}
          x={screenWidth/2} y={200}
          orientation="middle"
          pointerLength={0}
          cornerRadius={60}
          flyoutWidth={120}
          flyoutHeight={120}
          flyoutStyle={{ fill: "white", borderWidth: 0 }}
        />
      </>
    )
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

class SavingsSummary extends React.Component {

  state = {
    data: [{x: 0, y: 0}]
  }

  componentDidMount(){
    this.setState({
      data: pieDataCalc(this.props.savings)
    })
  }

  render() {
    console.log(this.state)
    return (
        <Container style={styles.nativeContainer}>
          {this.props.savings ? (
            <>
        <Content>
          <Text style={{...styles.header, marginBottom: 0}}>
          {numeral(totalInvested(this.props.savings)).format('$0,0')}
          </Text>
          <Text style={{...styles.chartHeader}}>invested in total</Text>
          <Text
            style={{...styles.chartHeader, marginTop: 20, marginBottom: -20}}>
            Here's how your portfolio breaks down
          </Text>
          <VictoryPie
            data={this.state.data}
            height={400}
            width={screenWidth}
            animate={{ duration: 2000 }}
            labelComponent={<CustomLabel />}
            colorScale={'cool'}
            innerRadius={120}
            labelRadius={400}
            style={{labels: { fill: '#00b5ec', fontSize: 20 } }}
          />
          <List style={{marginTop: -30}}>
            {this.props.savings.map(saving => {
              return (
                <Saving
                  item={saving}
                  key={saving.id.toString()}
                  navigation={this.props.navigation}
                />
              );
            })}
          </List>
        </Content>
        <Fab
          style={styles.fab}
          onPress={() => this.props.navigation.navigate('AddSavings')}>
          <Icon name="add" />
        </Fab>
        </>
      ) : (
        <Text>Loading!</Text>
      )}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(SavingsSummary);
