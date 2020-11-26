import React, { Component } from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

export function touchableView() {
  var TouchableElement = TouchableHighlight;
  TouchableElement.underlayColor = "#fafafa";
  if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
  }

  return TouchableElement;
}