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
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import sharedStyles from './Styles';
import realm from './Models';
import AppConstants from './AppConstants';

const { width, height } = Dimensions.get('window')

const getTests = function(state, _this) {
  
  fetch(AppConstants.hostName + '/api/v1/tests', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (
      responseJson != null && responseJson != undefined &&
      responseJson.tests != null && responseJson.tests != undefined &&
      Array.isArray(responseJson.tests)
    ) {
      var tests = [];
      for (var i = 0; i < responseJson.tests.length; i++) {
        var testJson = responseJson.tests[i];
        realm.write(() => {
          var existingObject = realm.objects('Test').filtered('code == "' + testJson.code +'"');
          if (existingObject.length == 0) {
            realm.create('Test', {
              shortName: testJson['short_name'],
              fullName: testJson['full_name'],
              code: testJson['code'],
              position: testJson['position'],
              isManual: testJson['is_manual'],
              id: testJson['id'],
            });
          }
        });
      }
    }
  })
  .catch(function(err) {
    Alert.alert('Error', 'Internet request failed, please check your connection and try again', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
  })
  .done();
}

const buttonClicked = function(state, _this) {
  var email = state.email;
  var password = state.password;
  if (email != null && email != undefined && email.length >= 3 && password != null && password != undefined && password.length > 2) {
    fetch(AppConstants.hostName + '/api/v1/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: email,
        // email: email,
        password: password,
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
        var userEmail = responseJson.user.email;
        var userNumber = responseJson.user.number;
        var sessionId = responseJson.session.id;
        var sessionToken = responseJson.session.token;

        //   try {
        //   await AsyncStorage.setItem('@appDataStore:userId', userId);
        //   await AsyncStorage.setItem('@appDataStore:sessionId', sessionId);
        //   await AsyncStorage.setItem('@appDataStore:sessionToken', sessionToken);
        // } catch { }
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
        Alert.alert('Error', 'Failed to login. Please try again', [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
      }
      return true;
    })
    .catch((error) => {
      Alert.alert('Error', 'Failed to login. Please try again', [
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

const forgotPassClicked = function(navigate) {
  navigate('ForgotPassword')
}

class LoginScreen extends Component {
  constructor() {
    super();
    getTests();
    this.state = {
      email: null,
      password: null,
      bottomInset: 0,
    };
  }

  static navigationOptions = {
    title: 'Login Screen',
    header: null,
  };

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

  render() {
    const { navigate } = this.props.navigation;

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

    return (
      <ScrollView
      style={customStyles.backgroundImage}
      ref='_scrollView'
      keyboardShouldPersistTaps={'handled'}
      alwaysBounceVertical={false}
      contentInset={{top: 0, left: 0, right: 0, bottom: this.state.bottomInset}}
      >
      {/* <Image source={require('../img/signup_background.jpg')} style={customStyles.backgroundImage}>*/}
        <View style={customStyles.container}>
          <Image source={require('../img/logo_tree.png')} style={customStyles.logo}/>
          <View style={customStyles.logoText}>
            <Text style={customStyles.logoTitle}>Alzheimer{"\'"}s</Text>
            <Text style={customStyles.logoSubtitle}>Screening, Diagnosis, & Management</Text>
          </View>
          <View style={[sharedStyles.textFieldContainer, customStyles.textFieldContainer]}>
              <Image style={sharedStyles.textFieldIcon} source={require('../img/icon_user.png')}></Image>
              <TextInput
                  onFocus={() => {this.onkeyboardShow()}}
                  onEndEditing={() => {this.onKeyboardHide()}}
                  style={[sharedStyles.textFieldStyle, customStyles.textFieldStyle]}
                  placeholder="NPI Number"
                  value={this.state.email}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {  this.focusOn('_passwordField') } }
                  onChangeText={(searchString) => {this.setState({email: searchString})}}
                  underlineColorAndroid="transparent"/>
          </View>
          <View style={[sharedStyles.textFieldContainer, customStyles.textFieldContainer]}>
              <Image style={sharedStyles.textFieldIcon} source={require('../img/icon_lock.png')}></Image>
              <TextInput
                  ref='_passwordField'
                  onFocus={() => {this.onkeyboardShow()}}
                  onEndEditing={() => {this.onKeyboardHide()}}
                  style={[sharedStyles.textFieldStyle, customStyles.textFieldStyle]}
                  placeholder="Password"
                  returnKeyType={'done'}
                  secureTextEntry={true}
                  value={this.state.password}
                  onSubmitEditing={() => {  buttonClicked(this.state, this) } }
                  onChangeText={(searchString) => {this.setState({password: searchString})}}
                  underlineColorAndroid="transparent"/>
          </View>
          <View style={sharedStyles.button}>
            <TouchableElement underlayColor={'#cdcdcd'} style={sharedStyles.button} onPress={() => buttonClicked(this.state, this)}>
              <View style={sharedStyles.buttonBackground}>
                <Text style={sharedStyles.buttonText}>Sign In</Text>
              </View>
            </TouchableElement>
          </View>
          <Image source={require('../img/logo_live_well.png')} style={customStyles.liveWellLogo}/>
        </View>
        <View style={customStyles.linksContainer}>
            <TouchableElement underlayColor={'#cdcdcd'} style={customStyles.createAccountContainer} onPress={() => navigate('CreateAccount')}>
              <View style={customStyles.createAccountContainerBackground}>
                <Text style={customStyles.linkText}>Create Account</Text>
              </View>
            </TouchableElement>
            <View style={customStyles.separator}></View>
            <TouchableElement underlayColor={'#cdcdcd'} style={customStyles.forgotPassContainer} onPress={() => forgotPassClicked(navigate)}>
              <View style={customStyles.forgotPassContainerBackground}>
                <Text style={customStyles.linkText}>Forgot Password</Text>
              </View>
            </TouchableElement>
          </View>
      {/* </Image>*/}
      </ScrollView>
    );
  }
}

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textFieldContainer: {
    backgroundColor: 'rgb(235,235,235)',
    marginBottom: 4,
    width: width * 0.847,
  },
  textFieldStyle: {
    backgroundColor: 'rgb(235,235,235)',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
      width: 25,
      height: 25,
      // position: 'absolute',
      // left: 7,
      // bottom: 7
  },
  input: {
      flex: 1,
      marginLeft: 5,
      backgroundColor: '#fff',
      color: '#424242',
  },
  linksContainer: {
    backgroundColor: 'white',
    flexDirection:'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  createAccountContainer: {
    marginTop: 15,
    marginLeft: 5,
  },
  createAccountContainerBackground: {
  },
  separator: {
    flex: 1,
  },
  forgotPassContainer: {
    marginTop: 15,
    marginLeft: 5,
  },
  forgotPassContainerBackground: {

  },
  linkText: {
    fontSize: 12,
    color: 'rgb(38,38,38)'
  },
  backgroundImage: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
  },
  logo: {
    marginTop: (Platform.OS === 'ios') ? 60 : 30,
    width: width * 0.6,
    height: (Platform.OS === 'ios') ? height * 0.29 : height * 0.29,
    resizeMode: 'contain'
  },
  liveWellLogo: {
    width: (Platform.OS === 'ios') ? width * 0.68 : width * 0.68,
    height: (Platform.OS === 'ios') ? width * 0.21 : width * 0.21,
    resizeMode: 'contain'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logoText: {
    alignItems: 'center',
  },
  logoTitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurple,
    fontSize: (Platform.OS === 'ios') ? 39 : 35,
    height: (Platform.OS === 'ios') ? height * 0.08 : height * 0.09,
    marginTop: 2,
  },
  logoSubtitle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 12 : 10,
    marginBottom: 25,
    marginTop: (Platform.OS === 'ios') ? -height * 0.004 : -height * 0.004,
  },
});

module.exports = LoginScreen;