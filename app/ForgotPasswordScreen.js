'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import sharedStyles from './Styles';
import AppConstants from './AppConstants';

const { width, height } = Dimensions.get('window')

const buttonClicked = function(state, _this) {
  var email = state.email;

  console.log("email");
  console.log(email);

  if (email == null || email == undefined || email.length < 3 || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    Alert.alert('Error', 'Please provide correct email address', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
    return
  }

        fetch(AppConstants.hostName + '/api/v1/recover', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (
            responseJson != null && responseJson != undefined &&
            responseJson.status != null && responseJson.status != undefined &&
            responseJson.status == 1
          ) {
            console.log(responseJson);
            Alert.alert('Success', 'A link to recover your password has been sent to your email', [
              {text: 'OK', onPress: () => {
                var routeName = 'Login';
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName })]
                })
                _this.props.navigation.dispatch(resetAction)
              }},
            ], { cancelable: false });
          } else {
            console.log(responseJson);
            Alert.alert('Error#548', 'Failed recover a password. Please try again', [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
          }
          return true;
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error #129', 'Failed recover a password. Please try again', [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
        });
}

class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      bottomInset: 0
    };
  }

  onKeyboardHide() {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    this.setState({bottomInset: 0})
  }

  onkeyboardShow() {
    this.setState({bottomInset: 230})
  }

  focusOn(nextField) {
    this.refs[nextField].focus()
  }

  onNpiChanged(str) {
    this.setState({number: str.replace(/\D/g,'') })
  }

  static navigationOptions = {
    title: 'Create Account',
    header: null,
  };
  render() {
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

    return (
      <ScrollView
      ref='_scrollView'
      keyboardShouldPersistTaps={'handled'}
      alwaysBounceVertical={false}
      contentInset={{top: 0, left: 0, right: 0, bottom: this.state.bottomInset}}
      style={customStyles.container}>

        <View style={customStyles.body}>
          <View style={[sharedStyles.blueContainer, customStyles.blueContainer]}>
            <View style={sharedStyles.navigationBar}>
              {/*Back button*/}
              <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack() }>
                <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_arrow_back.png')}></Image>
              </TouchableElement>
              <View style={sharedStyles.navigationSeparator}>
                <Text style={sharedStyles.navigationHeadertext}>Recover Password</Text>
              </View>
              <TouchableElement underlayColor={'#cdcdcd'}>
                <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/transparent.png')}></Image>
              </TouchableElement>
            </View>
            <Image source={require('../img/icon_add_avatar.png')} style={sharedStyles.addAccountImage}/>
          </View>

          {/*Email*/}
          <View style={sharedStyles.textFieldContainerWithBorder}>
              <Image style={sharedStyles.textFieldIcon} source={require('../img/icon_email.png')}></Image>
              <TextInput

                  ref='_emailField'
                  onFocus={() => {this.onkeyboardShow()}}
                  onEndEditing={() => {this.onKeyboardHide()}}
                  returnKeyType={'done'}
                  onSubmitEditing={() => { buttonClicked(this.state, this) } }
                  style={sharedStyles.textFieldStyle}
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={(searchString) => {this.setState({email: searchString})}}
                  underlineColorAndroid="transparent"/>
          </View>



          <View style={customStyles.footer}>
            <View style={[sharedStyles.button, customStyles.button]}>
              <TouchableElement underlayColor={'#cdcdcd'} style={sharedStyles.button} onPress={() => buttonClicked(this.state, this)}>
                <View style={[sharedStyles.buttonBackground, customStyles.buttonBackground]}>
                  <Text style={sharedStyles.buttonText}>Recover Password</Text>
                </View>
              </TouchableElement>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  body: {
    flex: 1,
  },
  blueContainer: {
    marginBottom: 20,
  },
  footer: {
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  footerLinksContainer: {
    marginTop: 15,
    flexDirection:'row',
  },
  signInText: {
    color: 'grey',
  },
  signInButton: {
    marginLeft: 2,
    color: 'black',
  },
  button: {
    marginTop: 10,
  },
  buttonBackground: {
    backgroundColor: AppConstants.colorPurpleLight,
  },

});

module.exports = ForgotPasswordScreen;