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

import sharedStyles from '../../Styles';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout, screenWidth } from '../../DrawerScreen';
import AppConstants from '../../AppConstants';

class MinicogStep2Screen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    const { navigate, goBack, state } = this.props.navigation;
    if (state != null && state != undefined && state.params != null && state.params != undefined) {
      var params = state.params
      if (params.testId != null && params.testId != undefined) {
        this.setState({testId: params.testId});
      }
      if (params.patientId != null && params.patientId != undefined) {
        this.setState({patientId: params.patientId});
      }
      if (params.testPoints != null && params.testPoints != undefined) {
        this.setState({testPoints: params.testPoints});
      }
    }
  }

  navigateNext(navigate, state) {
    return navigate('MinicogStep3', {
      testId: this.state.testId,
      patientId: this.state.patientId,
      testPoints: this.state.testPoints,
    });
  }

  static navigationOptions = {
    title: 'Screening Home Screen',
    header: null,
  };

  render() {
    const { navigate, goBack, state } = this.props.navigation;

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

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
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_arrow_back.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>Mini-Cog™
                  </Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>
            <ScrollView>
              <View style={sharedStyles.minicogMainContainer}>
                <View style={[sharedStyles.patientTestContainer, sharedStyles.marginTop20]}>
                  <Text style={[sharedStyles.patientTestTitle, customStyles.headerTitle]}>Word Registration Versions</Text>
                  <Text style={sharedStyles.patientTestDescription}>
                    The following and other word lists have been used in one or
                    more clinical studies. For repeated administrations, use of
                    an alternative word list is recommended.
                  </Text>
                </View>
                <View style={customStyles.wordsContainer}>
                  <View style={customStyles.columnLeft}>
                    <View style={customStyles.wordsVersion}>
                      <Text style={customStyles.versionName}>Version 1</Text>
                      <Text style={customStyles.versionWord}>Banana</Text>
                      <Text style={customStyles.versionWord}>Sunrise</Text>
                      <Text style={customStyles.versionWord}>Chair</Text>
                    </View>
                    <View style={customStyles.wordsVersion}>
                      <Text style={customStyles.versionName}>Version 2</Text>
                      <Text style={customStyles.versionWord}>Leader</Text>
                      <Text style={customStyles.versionWord}>Season</Text>
                      <Text style={customStyles.versionWord}>Table</Text>
                    </View>
                    <View style={customStyles.wordsVersion}>
                      <Text style={customStyles.versionName}>Version 3</Text>
                      <Text style={customStyles.versionWord}>Village</Text>
                      <Text style={customStyles.versionWord}>Kitchen</Text>
                      <Text style={customStyles.versionWord}>Baby</Text>
                    </View>
                  </View>
                  <View style={customStyles.columnRight}>
                    <View style={customStyles.wordsVersion}>
                      <Text style={customStyles.versionName}>Version 4</Text>
                      <Text style={customStyles.versionWord}>River</Text>
                      <Text style={customStyles.versionWord}>Nation</Text>
                      <Text style={customStyles.versionWord}>Finger</Text>
                    </View>
                    <View style={customStyles.wordsVersion}>
                      <Text style={customStyles.versionName}>Version 5</Text>
                      <Text style={customStyles.versionWord}>Captain</Text>
                      <Text style={customStyles.versionWord}>Garden</Text>
                      <Text style={customStyles.versionWord}>Picture</Text>
                    </View>
                    <View style={customStyles.wordsVersion}>
                      <Text style={customStyles.versionName}>Version 6</Text>
                      <Text style={customStyles.versionWord}>Daughter</Text>
                      <Text style={customStyles.versionWord}>Heaven</Text>
                      <Text style={customStyles.versionWord}>Mountain</Text>
                    </View>
                  </View>
                </View>
                <View style={[sharedStyles.nextButtonContainer, sharedStyles.marginBottom20]}>
                  <TouchableElement underlayColor={'#cdcdcd'} onPress={() => this.navigateNext(navigate, this.state) }>
                    <Image style={sharedStyles.nextTestButton} source={require('../../../img/next_test_button.png')}/>
                  </TouchableElement>
                </View>
              </View>
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
    backgroundColor: 'rgb(255, 255, 255)',
  },
  body: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    padding: 10
  },
  wordsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 20,
  },
  columnLeft: {
    flex: 1,
  },
  columnRight: {
    flex: 1,
  },
  wordsVersion: {
    paddingBottom: 10,
  },
  versionName: {
    fontFamily: AppConstants.fontBold,
    color: AppConstants.colorTextLight,
    fontSize: 14,
  },
  versionWord: {
    fontFamily: AppConstants.fontRegular,
    color: AppConstants.colorTextLight,
    fontSize: 14,
  },
  headerTitle: {
    marginTop: 20,
  }

});

module.exports = MinicogStep2Screen;