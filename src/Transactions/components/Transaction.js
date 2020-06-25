import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Transaction = props => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.name}>{moment(props.item.created_at).format('MMM Do')}</Text>
    </View>
    <View style={[styles.cardContent, styles.tagsContent]}>
      <Text style={styles.name}>{props.item.merchant}</Text>
      <Text style={styles.name}>{props.item.spending_category}</Text>
      <Text style={styles.name}>${props.item.amount}</Text>
    </View>
  </TouchableOpacity>
);

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
    fontSize: 18,
    marginLeft: 10,
    alignSelf: 'center'
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
});