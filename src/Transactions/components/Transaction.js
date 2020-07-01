import React from 'react';
import moment from 'moment';
import {ListItem, Body, Right, Text} from 'native-base';

const Transaction = props => (
  <ListItem
    onPress={() => props.navigation.navigate('EditTransaction', {...props})}>
    <Body>
      <Text>{moment(props.item.created_at).format('MMM Do')}</Text>
      <Text>{props.item.merchant}</Text>
      <Text note>{props.item.spending_category}</Text>
    </Body>
    <Right>
      <Text note style={{color: 'blue'}}>
        ${props.item.amount}
      </Text>
    </Right>
  </ListItem>
);

export default Transaction;
