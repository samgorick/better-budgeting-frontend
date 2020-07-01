import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Saving from './Saving';
import {VictoryPie} from 'victory-native';
import {Container, Content, List, Fab, Icon} from 'native-base';

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
    return {x: saving.name, y: order[0].value};
  });
};

class SavingsSummary extends React.Component {
  render() {
    return (
      <>
      <ScrollView>
        <Text style={styles.mainHeader}>
          ${totalInvested(this.props.savings)}
        </Text>
        <Text style={styles.header}>invested in total</Text>
        <Text style={styles.header}>
          Here's how your spending breaks down this month
        </Text>
        <VictoryPie
          data={pieDataCalc(this.props.savings)}
          colorScale={'cool'}
          innerRadius={50}
        />
        <List>
        {this.props.savings.map(saving => {
          return <Saving item={saving} key={saving.id.toString()} navigation={this.props.navigation}/>
        })}
        </List>
        </ScrollView>
        <View style={styles.extraContainer}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.props.navigation.navigate('AddSavings')}>
            <Text style={styles.buttonText}>Add Savings</Text>
          </TouchableOpacity>
        </View>
        </>
    );
  }
}

export default connect(mapStateToProps)(SavingsSummary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 0,
    marginBottom: 18,
    marginHorizontal: 10,
  },
  mainHeader: {
    textAlign: 'center',
    fontSize: 80,
    marginTop: 18,
    marginHorizontal: 10,
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
