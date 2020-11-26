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
  ListView,
  Alert,
  AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import AppConstants from './AppConstants';
import realm from './Models';
import Dimensions from 'Dimensions';

const { width, height } = Dimensions.get('window')

const logout = function(_this) {
  AsyncStorage.removeItem('@appDataStore:userId').then(function() {
      AsyncStorage.removeItem('@appDataStore:sessionId').then(function() {
        AsyncStorage.removeItem('@appDataStore:sessionToken').then(function() {
          // remove everything from realm:
          realm.write(() => {
            realm.delete(realm.objects('Patient'));
            realm.delete(realm.objects('Result'));
          });



          var routeName = 'Login';
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
          })
          _this.props.navigation.dispatch(resetAction)
        }).done();
      }).done();
    }).done();
}

const navigateTo = function(navigate, screenName, th, drawerObject) {
  if (screenName != th) {
    navigate(screenName)
  } else {
    drawerObject.closeDrawer();
  }
}

export function screenWidth() {
  return Dimensions.get('window').width
}

export function drawerLayout(_this, navigate, currentRoute, drawerObject) {
  var TouchableElement = TouchableHighlight;
  if (Platform.OS === 'android') {
   TouchableElement = TouchableNativeFeedback;
  }
  return (
    <View style={customStyles.container}>
      <TouchableElement underlayColor={'#cdcdcd'} style={customStyles.closeButtonContainer} onPress={() => { drawerObject.closeDrawer(); }}>
        <Image style={customStyles.closeButton} source={require('../img/icon_cross_grey.png')}></Image>
      </TouchableElement>
      <View style={customStyles.navContainer}>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateTo(navigate, 'Home', currentRoute, drawerObject) }>
          <Text style={[customStyles.drawerText, customStyles.active]}>Home</Text>
        </TouchableElement>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateTo(navigate, 'ScreeningHome', currentRoute, drawerObject) }>
          <Text style={[customStyles.drawerText, customStyles.inactive]}>Screening</Text>
        </TouchableElement>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateTo(navigate, 'DiagnosisHome', currentRoute, drawerObject) }>
          <Text style={[customStyles.drawerText, customStyles.inactive]}>Evaluation & Diagnosis</Text>
        </TouchableElement>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateTo(navigate, 'TreatingHome', currentRoute, drawerObject) }>
          <Text style={[customStyles.drawerText, customStyles.inactive]}>Treating Symptoms</Text>
        </TouchableElement>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateTo(navigate, 'ActivePatients', currentRoute, drawerObject) }>
          <Text style={[customStyles.drawerText, customStyles.inactive]}>Instruments & Active Patients</Text>
        </TouchableElement>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateTo(navigate, 'AddPatient', currentRoute, drawerObject) }>
          <Text style={[customStyles.drawerText, customStyles.inactive]}>Add Patient</Text>
        </TouchableElement>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => logout(_this)}>
          <View style={customStyles.logoutContainer}>
            <Image style={customStyles.logoutIcon} source={require('../img/icon_logout.png')}></Image>
            <Text style={customStyles.logoutText}>Log Out</Text>
          </View>
        </TouchableElement>
      </View>
    </View>
  );
}

export function openDrawer(drawer) {
  drawer.openDrawer();
}

const customStyles = StyleSheet.create({
  closeButtonContainer: {
    marginTop: (Platform.OS === 'ios') ? height * 0.03 : 0,
    marginLeft: (Platform.OS === 'ios') ? height * 0.02 : 0,
    width: 40,
    height: 40,
  },
  closeButton: {
    width: 20,
    height: 20,
    marginTop: (Platform.OS === 'ios') ? 0 : height * 0.02,
    marginLeft: (Platform.OS === 'ios') ? 0 : height * 0.02,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(51, 51, 51)',
  },
  drawerText: {
    color: 'white',
    fontSize: 18,
    margin: 18,
    fontFamily: AppConstants.fontRegular,
  },
  logoutIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  navContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  logoutContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontFamily: AppConstants.fontBold,
    color: 'white',
    fontSize: 13,
    margin: 10,
  },
  active: {
    color: 'white',
  },
  inactive: {
    color: 'rgb(182,182,182)',
  },
});