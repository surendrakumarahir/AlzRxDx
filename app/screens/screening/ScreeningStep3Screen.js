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

class ScreeningStep3Screen extends Component {
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
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_arrow_back.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>Screening</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <ScrollView style={sharedStyles.infoContainer} contentInset={{top: 0, left: 0, right: 0, bottom: 60}}>
              <Text style={sharedStyles.infoHeaderYellow}>Conduct Cognitive Screen</Text>
              <Text style={[sharedStyles.infoText, sharedStyles.marginBottom20]}>
                <Text style={sharedStyles.questionText}>
                  Assess for Red Flags{"\n"}
                  Fail = Mini Cog™ {"≤"}3
                </Text>
              </Text>
              <Text style={sharedStyles.infoHeaderYellow}>Optimal</Text>
              <Text style={[sharedStyles.infoText, sharedStyles.marginBottom20]}>
                Conduct Informant Screen{"\n"}
                <Text style={sharedStyles.questionText}>
                  Fail = AD8 ≥2
                </Text>
              </Text>
              <Text style={sharedStyles.infoHeaderRed}>Red Flag Conditions</Text>
              <Text style={[sharedStyles.infoText, sharedStyles.marginBottom40]}>
                • Rapid Progression (w/in 6 months){"\n"}
                • Recent Sudden Changes{"\n"}
                • Young Onset ({"<"}65)
              </Text>

              <View style={sharedStyles.buttonContainer}>
                <View style={[sharedStyles.button, customStyles.redBackground, sharedStyles.marginBottom10]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.redBackground]} onPress={() => navigate('ScreeningRedFlag1')}>
                      <View style={[sharedStyles.buttonBackground, customStyles.redBackground]}>
                        <Text style={sharedStyles.buttonText}>Red Flag Conditions or Test Failure</Text>
                      </View>
                  </TouchableElement>
                </View>

                <View style={[sharedStyles.button, customStyles.greenBackground, sharedStyles.marginBottom10]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.greenBackground]} onPress={() => navigate('ScreeningPass')}>
                      <View style={[sharedStyles.buttonBackground, customStyles.greenBackground]}>
                        <Text style={sharedStyles.buttonText}>Pass</Text>
                      </View>
                  </TouchableElement>
                </View>

                <View style={[sharedStyles.button, customStyles.lightPurpleBackground, sharedStyles.marginBottom10]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.lightPurpleBackground]} onPress={() => navigate('AddPatient')}>
                      <View style={[sharedStyles.buttonBackground, customStyles.lightPurpleBackground]}>
                        <Text style={sharedStyles.buttonText}>Add Patient & Start Screening</Text>
                      </View>
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
  redBackground: {
    backgroundColor: AppConstants.colorRed,
  },
  greenBackground: {
    backgroundColor: AppConstants.colorTextGreen,
  },
  lightPurpleBackground: {
    backgroundColor: AppConstants.colorPurpleLight,
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

module.exports = ScreeningStep3Screen;