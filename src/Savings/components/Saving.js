import React from 'react';
import moment from 'moment';
import {ListItem, Body, Right, Text} from 'native-base';
import numeral from 'numeral'
import styles from '../../../Styles/styles'

const findFirst = values => {
  const order = values.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return order[0];
};

const Saving = props => (
  <ListItem
    onPress={() => props.navigation.navigate('ShowSavings', {...props})}>
    <Body>
      <Text>{props.item.name}</Text>
      <Text>
        {moment(findFirst(props.item.saving_values).created_at).format(
          'MMM Do',
        )}
      </Text>
      <Text note style={styles.listSpendingCategory}>{props.item.saving_category}</Text>
    </Body>
    <Right>
      <Text note style={styles.listAmount}>
        {numeral(findFirst(props.item.saving_values).value).format('$0,0')}
      </Text>
    </Right>
  </ListItem>
);

export default Saving;