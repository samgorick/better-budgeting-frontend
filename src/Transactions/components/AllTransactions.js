import React from 'react';
import {connect} from 'react-redux';
import Transaction from './Transaction';
import {Container, Content, List, Fab, Icon} from 'native-base';
import styles from '../../../Styles/styles';

const mapStateToProps = state => {
  return {transactions: state.transactions};
};

const AllTransactions = props => (
  <Container style={{backgroundColor: '#f5f9ff'}}>
    {props.transactions ? (
      <Content>
        <List>
          {props.transactions.map(txn => (
            <Transaction
              item={txn}
              key={txn.id}
              navigation={props.navigation}
            />
          ))}
        </List>
      </Content>
    ) : null}
    <Fab
      style={styles.fab}
      onPress={() => props.navigation.navigate('AddTransaction')}>
      <Icon name="add" />
    </Fab>
  </Container>
);
export default connect(mapStateToProps)(AllTransactions);
