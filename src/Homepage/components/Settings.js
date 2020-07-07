import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../../Styles/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {logoutUser} from '../../User/actions'
import {connect} from 'react-redux';

class Settings extends React.Component{

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{...styles.container, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{...styles.buttonContainer, backgroundColor: '#A22C29'}}
            onPress={() => this.props.logoutUser()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Settings)