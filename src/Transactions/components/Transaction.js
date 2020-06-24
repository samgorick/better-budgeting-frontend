import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment'

const Transaction = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{moment(props.transaction.created_at).format('Do MMM')}</Text>
    <Text style={styles.text}>{props.transaction.merchant}</Text>
    <Text style={styles.text}>${props.transaction.amount}</Text>
  </View>

)

export default Transaction

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black'
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 25
  }
})