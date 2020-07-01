import React from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ListItem, Body, Right, Text} from 'native-base';

const findFirst = values => {
  const order = values.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return order[0];
};

const Saving = props => (
  <ListItem
    onPress={() => props.navigation.navigate('ShowSavings', {...props})}>
    <Body>
      <Text>{props.item.name}</Text>
      <Text note>
        {moment(findFirst(props.item.saving_values).created_at).format(
          'MMM Do',
        )}
      </Text>
      <Text note>{props.item.saving_category}</Text>
    </Body>
    <Right>
      <Text note style={{color: 'blue'}}>
        ${findFirst(props.item.saving_values).value}
      </Text>
    </Right>
  </ListItem>
);

export default Saving;