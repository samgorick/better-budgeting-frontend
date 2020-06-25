import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Transaction extends React.Component{
  render(){
    return (
      <TouchableOpacity style={styles.card}
        onPress={() => this.props.navigation.navigate('EditTransaction', {...this.props})}
      >
        <View style={styles.cardContent}>
        <Text style={styles.name}>{moment(this.props.item.created_at).format('MMM Do')}</Text>
        </View>
        <View style={[styles.cardContent, styles.tagsContent]}>
          <Text style={styles.name}>{this.props.item.merchant}</Text>
          <Text style={styles.name}>{this.props.item.spending_category}</Text>
          <Text style={styles.amount}>${this.props.item.amount}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Transaction;

const styles = StyleSheet.create({
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 10,
    borderTopColor: '#00b5ec',
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
    alignSelf: 'center'
  },
  amount: {
    fontSize: 18,
    marginLeft: 10,
    alignSelf: 'flex-end' 
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
});