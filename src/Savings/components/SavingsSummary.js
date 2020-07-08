import React from 'react';
import {connect} from 'react-redux';
import Saving from './Saving';
import { Dimensions } from 'react-native'
import { VictoryPie, VictoryTooltip } from 'victory-native';
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
    return {x: saving.name, y: order[0].value, label: `${saving.name}\n ${value}`};
  });
};

const screenWidth = Dimensions.get('window').width;

class SavingsSummary extends React.Component {

  state = {
    data: [{x: 0, y: 0}]
  }

  componentDidMount() {
      this.setState({
        data: pieDataCalc(this.props.savings)
      });
    }

  componentDidUpdate(prevProps){
    if(this.props.savings !== prevProps.savings){
      this.setState({
        data: pieDataCalc(this.props.savings)
      })
    } 
  }

  render() {
    return (
        <Container style={styles.nativeContainer}>
          {this.props.savings.length > 0 ? (
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
            labelComponent={
              <VictoryTooltip
                x={screenWidth / 2}
                y={200}
                orientation="center"
                renderInPortal={false}
                cornerRadius={60}
                flyoutWidth={120}
                flyoutHeight={120}
                flyoutStyle={{fill: '#f5f9ff', strokeWidth: 0}}
                style={{fontSize: 20, fontFamily: '', fill: '#235789'}}
              />
            }
            colorScale={['#235789', '#43C59E', '#228CDB', '#0B7189', '#e15554']}
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
        ) : ( null
      )}
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
