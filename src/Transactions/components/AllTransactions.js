import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Transaction from './Transaction';
import {TouchableOpacity} from 'react-native-gesture-handler';

const mapStateToProps = state => {
  return {transactions: state.transactions};
};

class AllTransactions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.notificationList}
          data={this.props.transactions}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({item}) => {
            return <Transaction item={item} navigation={this.props.navigation}/>;
          }}
        />
        <View style={styles.extraContainer}>
          <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('AddTransaction')}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  notificationList: {
    marginTop: 20,
    padding: 10
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
  }
});

export default connect(mapStateToProps)(AllTransactions);
