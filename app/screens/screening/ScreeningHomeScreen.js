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

class ScreeningHomeScreen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
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
            <View style={sharedStyles.treeImageContainer}>
              <Image style={sharedStyles.treeImage} source={require('../../../img/tree.png')}></Image>
            </View>
            <View style={sharedStyles.transparentContainer}>
              <View style={sharedStyles.navigationBarClear}>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_arrow_back_grey.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertextGray}></Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger_grey.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <View style={sharedStyles.homeScreenTitleContainer}>
              <Text style={sharedStyles.homeScreenMainTitle}>Screening</Text>
              <Text style={sharedStyles.homeScreenSubtitle}>Recommended Screening Algorithm{"\n"}for Adult Cognitive Impairment</Text>
            </View>

            <View style={[sharedStyles.homeScreenFooter, sharedStyles.buttonContainer]}>
              <View style={[sharedStyles.button]}>
                <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button]} onPress={() => navigate('ScreeningStep1')}>
                    <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                      <Text style={sharedStyles.buttonText}>Start</Text>
                    </View>
                </TouchableElement>
              </View>
            </View>
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
});

module.exports = ScreeningHomeScreen;