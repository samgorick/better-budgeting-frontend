import React from 'react';
import {SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../../Styles/styles';
import {Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {logoutUser} from '../../User/actions';
import {connect} from 'react-redux';

// Class set up due to mapDispatchToProps, simplifying cause and action with dispatch rather than going up to app.js
class Settings extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{...styles.container, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.negativeButtonContainer}
            onPress={() => this.props.logoutUser()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  {logoutUser}
)(Settings);
