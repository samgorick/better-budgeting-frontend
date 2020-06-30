import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const findFirst = values => {
  const order = values.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
  return order[0]
}

const Saving = props => (
      <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('ShowSavings', {...props})}>
        <View style={styles.cardContent}>
        <Text style={styles.name}>{props.item.name}</Text>
        </View>
        <View style={[styles.cardContent, styles.tagsContent]}>
          <Text style={styles.name}>{props.item.saving_category}</Text>
          <Text style={styles.name}>{moment(findFirst(props.item.saving_values).created_at).format('MMM Do')}</Text>
          <Text style={styles.amount}>${findFirst(props.item.saving_values).value}</Text>
        </View>
      </TouchableOpacity>
    )

export default Saving;

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