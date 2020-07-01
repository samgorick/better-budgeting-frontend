import React from 'react';
import {connect} from 'react-redux';
import Saving from './Saving';
import {Dimensions} from 'react-native'
import {VictoryPie, VictoryContainer, VictoryLabel, VictoryTooltip} from 'victory-native';
import {Container, Content, List, Fab, Icon, Text} from 'native-base';
import styles from '../../../Styles/styles';

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
    return {x: saving.name, y: order[0].value, label: `${saving.name}\n $${order[0].value}`};
  });
};

const screenWidth = Dimensions.get('window').width;

class SavingsSummary extends React.Component {
  render() {
    return (
      <Container style={{backgroundColor: '#f5f9ff'}}>
        <Content>
          <Text style={{...styles.header, marginBottom: 0}}>
            ${totalInvested(this.props.savings)}
          </Text>
          <Text style={{...styles.chartHeader}}>invested in total</Text>
          <Text
            style={{...styles.chartHeader, marginTop: 20, marginBottom: 10}}>
            Here's how your portfolio breaks down
          </Text>
          <VictoryPie
            data={pieDataCalc(this.props.savings)}
            height={400}
            width={screenWidth}
            labelRadius={160}
            colorScale={'cool'}
            innerRadius={50}
          />
          <List>
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
      </Container>
    );
  }
}

export default connect(mapStateToProps)(SavingsSummary);
