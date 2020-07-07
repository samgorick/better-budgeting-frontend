import React from 'react';
import moment from 'moment';
import {ListItem, Body, Right, Text} from 'native-base';
import numeral from 'numeral'
import styles from '../../../Styles/styles'

const Transaction = props => (
  <ListItem
    onPress={() => props.navigation.navigate('EditTransaction', {...props})}>
    <Body>
      <Text>{moment(props.item.created_at).format('MMM Do')}</Text>
      <Text>{props.item.merchant}</Text>
      <Text note style={styles.listSpendingCategory}>{props.item.spending_category}</Text>
    </Body>
    <Right>
      <Text note style={styles.listAmount}>
        {numeral(props.item.amount).format('$0,0.00')}
      </Text>
    </Right>
  </ListItem>
);

export default Transaction;
