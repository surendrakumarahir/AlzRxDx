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
  Dimensions,
} from 'react-native';

import sharedStyles from './Styles';
import Swipeout from 'react-native-swipeout';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout, screenWidth } from './DrawerScreen';
import realm from './Models';
import AppConstants from './AppConstants';
import PieChart from 'react-native-pie-chart';
import { touchableView } from './TouchableView';

const { width, height } = Dimensions.get('window')


class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      npiNumber: null,
    };
    var _this = this;
    AsyncStorage.getItem('@appDataStore:userNumber').then((value) => {
      _this.setState({npiNumber: value});
    }).done();
  }

  static navigationOptions = {
    title: 'Home Screen',
    header: null,
  };

  render() {
    const { navigate, state } = this.props.navigation;

    var TouchableElement = touchableView();

    return (
      <DrawerLayout
        drawerWidth={screenWidth()}
        drawerPosition={DrawerLayout.positions.Right}
        ref={'DRAWER_REF'}
        renderNavigationView={() => drawerLayout(this, navigate, state.routeName, this.refs['DRAWER_REF']) }>

        <View style={customStyles.container}>
          <View style={customStyles.body}>
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                {/*Plus button*/}
                <Image style={sharedStyles.navigationBarLeftButton}></Image>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>{this.state.npiNumber}</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <ScrollView>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('ScreeningHome')}>
                  <View style={customStyles.cellContainer}>
                    <Text style={customStyles.cellTitle}>Screening</Text>
                    <View style={customStyles.navigationIconCircle}>
                      <Image style={customStyles.navigationIcon} source={require('../img/icon_arrow.png')}></Image>
                    </View>
                  </View>
                </TouchableElement>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('DiagnosisHome')}>
                  <View style={customStyles.cellContainer}>
                    <Text style={customStyles.cellTitle}>Evaluation & Diagnosis</Text>
                    <View style={customStyles.navigationIconCircle}>
                      <Image style={customStyles.navigationIcon} source={require('../img/icon_arrow.png')}></Image>
                    </View>
                  </View>
                </TouchableElement>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('TreatingHome')}>
                  <View style={customStyles.cellContainer}>
                    <Text style={customStyles.cellTitle}>Treating Symptoms</Text>
                    <View style={customStyles.navigationIconCircle}>
                      <Image style={customStyles.navigationIcon} source={require('../img/icon_arrow.png')}></Image>
                    </View>
                  </View>
                </TouchableElement>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('ActivePatients')}>
                  <View style={customStyles.cellContainer}>
                    <Text style={customStyles.cellTitle}>Instruments & Active Patients</Text>
                    <View style={customStyles.navigationIconCircle}>
                      <Image style={customStyles.navigationIcon} source={require('../img/icon_arrow.png')}></Image>
                    </View>
                  </View>
                </TouchableElement>
                <TouchableElement underlayColor={'#cdcdcd'} style={customStyles.lastElement} onPress={() => navigate('AddPatient')}>
                  <View style={customStyles.noBorder}>
                    <Text style={customStyles.cellTitle}>Add Patient</Text>
                    <View style={[customStyles.navigationIconCircle, customStyles.greenColor]}>
                      <Image style={customStyles.navigationIcon} source={require('../img/icon_plus.png')}></Image>
                    </View>
                  </View>
                </TouchableElement>
            </ScrollView>


          </View>
        </View>


      </DrawerLayout>
    );
  }
}

const customStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgb(225, 225, 225)',
  },

  navContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  navigationIconCircle: {
    backgroundColor: AppConstants.colorPurpleLight,
    borderRadius: 30,
    width: (Platform.OS === 'ios') ? height * 0.08 : height * 0.09,
    height: (Platform.OS === 'ios') ? height * 0.08 : height * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenColor: {
    backgroundColor: 'rgb(96,182,62)',
  },
  navigationIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  cellContainer: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    paddingTop: (Platform.OS === 'ios') ? height * 0.04 : height * 0.04,
    paddingBottom: (Platform.OS === 'ios') ? height * 0.04 : height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  noBorder: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 27,
    paddingBottom: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  cellTitle: {
    flex: 1,
    fontFamily: AppConstants.fontRegular,
    fontSize: (Platform.OS === 'ios') ? 16 : 14,
    color: AppConstants.colorTextLight,
  },
  lastElement: {
    marginBottom: 100,
  },
});

module.exports = HomeScreen;