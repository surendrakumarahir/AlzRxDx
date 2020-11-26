import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';

exports.hostName = 'http://159.89.153.54:3000'; //staging
// exports.hostName = 'http://138.68.225.220:3030'; //staging old
// exports.hostName = 'http://138.68.225.220:3040'; //production
// exports.hostName = Platform.OS === 'android' ? 'http://10.0.3.2:9292' : 'http://127.0.0.1:9292';
exports.colorPurple = 'rgb(98, 46, 145)';
exports.colorPurpleLight = 'rgb(151,104,225)';
exports.colorTextLight = 'rgb(40,40,40)';
exports.colorTextGreen = 'rgb(28,177,19)';
exports.colorYellow = 'rgb(219,140,15)'
exports.colorRed = 'rgb(197,27,55)'
exports.colorBlue = 'rgb(40,172,241)'

exports.fontLight = Platform.OS === 'android' ? 'avenir_light' : 'Avenir-Light';
exports.fontRegular = Platform.OS === 'android' ? 'avenir_book' : 'Avenir-Book';
exports.fontBold = Platform.OS === 'android' ? 'avenir-heavy' : 'Avenir-Heavy';
exports.fontTitle = Platform.OS === 'android' ? 'avenir_medium' : 'Avenir-Medium';