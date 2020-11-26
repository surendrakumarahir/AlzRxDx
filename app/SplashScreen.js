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
  Alert,
  AsyncStorage,
} from 'react-native';

import { NavigationActions } from 'react-navigation'

import sharedStyles from './Styles';


class SplashScreen extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('@appDataStore:sessionToken').then((value) => {
      if (value != null) {
          this._navigateTo('Home')
      } else {
        this._navigateTo('Login')
      }
    }).done();

  }

  static navigationOptions = {
    title: 'Splash Screen',
    header: null,
  };

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View></View>
    );
  }
}

const customStyles = StyleSheet.create({

});

module.exports = SplashScreen;