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
import { NavigationActions } from 'react-navigation'

class DiagnosisNormalScreen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  goHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
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
                  <Text style={sharedStyles.navigationHeadertext}>Diagnosis</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <View style={sharedStyles.infoContainer}>
              <Text style={sharedStyles.infoHeaderGreen}>If MOCA or SLUMS Normal</Text>
              <Text style={sharedStyles.infoText}>
                • Reassure patient{"\n"}
                • Consider rescreening 3-6 months{"\n"}
                • If concern re MCI consider Neuro-psychological testing{"\n"}
              </Text>
              <Image style={[sharedStyles.navigationBarLeftButton, sharedStyles.marginBottom20]} source={require('../../../img/icon_arrow_down.png')}></Image>
              <Text style={sharedStyles.infoHeaderRed}>If Persistent Depression</Text>
              <Text style={sharedStyles.infoText}>
                Refer to psychiatrist, other specialists or treat as appropriate
              </Text>
            </View>

            <View style={[customStyles.infoContainerFooter, sharedStyles.buttonContainer]}>
              <View style={[sharedStyles.button, customStyles.greenBackground]}>
                <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.greenBackground]} onPress={() => this.goHome()}>
                    <View style={[sharedStyles.buttonBackground,  customStyles.greenBackground]}>
                      <Text style={sharedStyles.buttonText}>Diagnosis Complete</Text>
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
  infoContainerFooter: {
    padding: 30,
  },
  greenBackground: {
    backgroundColor: AppConstants.colorTextGreen,

  },
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

module.exports = DiagnosisNormalScreen;