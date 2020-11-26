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
  var password = state.password;
  var number = state.number;

  if (email == null || email == undefined || email.length < 3 || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    Alert.alert('Error', 'Please provide correct email address', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
    return
  }

  if (password == null || password == undefined || password.length < 3) {
    Alert.alert('Error', 'Please provide correct password', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
    return
  }


  if (
    email != null && email != undefined && email.length > 3 &&
    number != null && number != undefined && number.length > 2 &&
    password != null && password != undefined && password.length > 2
  ) {
    fetch(AppConstants.hostName + '/api/v1/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        number: number,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (
        responseJson != null && responseJson != undefined &&
        responseJson.user != null && responseJson.user != undefined &&
        responseJson.session != null && responseJson.session != undefined
      ) {
        var userId = responseJson.user.id;
        var sessionId = responseJson.session.id;
        var sessionToken = responseJson.session.token;
        var userEmail = responseJson.user.email;
        var userNumber = responseJson.user.number;

        AsyncStorage.setItem('@appDataStore:userId', userId).then(function() {
          AsyncStorage.setItem('@appDataStore:sessionId', sessionId).then(function() {
            AsyncStorage.setItem('@appDataStore:sessionToken', sessionToken).then(function() {
              AsyncStorage.setItem('@appDataStore:userNumber', userNumber).then(function() {
                AsyncStorage.setItem('@appDataStore:userEmail', userEmail).then(function() {
                  var routeName = 'Home';
                  const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName })]
                  })
                  _this.props.navigation.dispatch(resetAction)
                }).done();
              }).done();
            }).done();
          }).done();
        }).done();
      } else {
        Alert.alert('Error', 'Failed to create an account. Please try again', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
      }
      return true;
    })
    .catch((error) => {
      console.log("-----------")
      console.error(error);
      Alert.alert('Error', 'Failed to create an account. Please try again', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
    });
  } else {
    Alert.alert('Error', 'Incorrect credentials', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
  }
}

const createAccountClicked = function() {
  console.log('button clicked');
}

const forgotPassClicked = function() {
  console.log('button clicked');
}

class CreateAccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      number: null,
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
                <Text style={sharedStyles.navigationHeadertext}>Create Account</Text>
              </View>
              <TouchableElement underlayColor={'#cdcdcd'}>
                <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/transparent.png')}></Image>
              </TouchableElement>
            </View>
            <Image source={require('../img/icon_add_avatar.png')} style={sharedStyles.addAccountImage}/>
          </View>

          {/*Physician NPI Number*/}
          <View style={sharedStyles.textFieldContainerWithBorder}>
              <Image style={sharedStyles.textFieldIcon} source={require('../img/icon_user.png')}></Image>
              <TextInput
                  onFocus={() => {this.onkeyboardShow()}}
                  onEndEditing={() => {this.onKeyboardHide()}}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {  this.focusOn('_passwordField') } }
                  style={sharedStyles.textFieldStyle}
                  placeholder="Physician NPI Number"
                  value={this.state.number}
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(searchString) => {this.onNpiChanged(searchString)}}
                  underlineColorAndroid="transparent"/>
          </View>

          {/*Password*/}
          <View style={sharedStyles.textFieldContainerWithBorder}>
              <Image style={sharedStyles.textFieldIcon} source={require('../img/icon_lock.png')}></Image>
              <TextInput
                  ref='_passwordField'
                  onFocus={() => {this.onkeyboardShow()}}
                  onEndEditing={() => {this.onKeyboardHide()}}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {  this.focusOn('_emailField') } }
                  style={sharedStyles.textFieldStyle}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(searchString) => {this.setState({password: searchString})}}
                  underlineColorAndroid="transparent"/>
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
                  <Text style={sharedStyles.buttonText}>Create Account</Text>
                </View>
              </TouchableElement>
            </View>

            <View style={customStyles.footerLinksContainer}>
              <Text style={customStyles.signInText}>
                Already have an account?
              </Text>
              <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack() }>
                  <Text style={customStyles.signInButton}>Sign In</Text>
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

module.exports = CreateAccountScreen;