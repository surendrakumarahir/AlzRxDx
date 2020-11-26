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

class TreatingStep4Screen extends Component {
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
                  <Text style={sharedStyles.navigationHeadertext}>Treating Symptoms</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <ScrollView style={sharedStyles.testContainer}>
              <View style={sharedStyles.infoContainer}>
                <Text style={sharedStyles.infoHeaderYellow}>Evaluate (& Re-Evaluate)</Text>
                <Text style={[sharedStyles.infoText, sharedStyles.marginBottom20]}>
                  <Text style={sharedStyles.questionText}>
                    Evaluate whether “CREATE” interventions implemented by
                    caregiver(s) have been{"\n"}safe/effective{"\n\n"}
                  </Text>
                  • Make modifications as needed and continue to look for
                  possible underlying causes{"\n"}
                  • Re-evaluate periodically{"\n"}
                  • If intervention not effective or if patient or
                  caregiver are in danger, consider referring to
                  neurologist or psychiatrist{"\n"}
                </Text>
              </View>
              <View style={sharedStyles.testContainer}></View>
              <View style={[customStyles.infoContainerFooter, sharedStyles.buttonContainer]}>
                <View style={[sharedStyles.button, customStyles.greenBackground, sharedStyles.marginBottom10]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.greenBackground]} onPress={() => this.goHome()}>
                      <View style={[sharedStyles.buttonBackground, customStyles.greenBackground]}>
                        <Text style={sharedStyles.buttonText}>Treating Symptoms Complete</Text>
                      </View>
                  </TouchableElement>
                </View>

                <View style={[sharedStyles.button, customStyles.lightPurpleBackground, sharedStyles.marginBottom10]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.lightPurpleBackground, sharedStyles.marginBottom10]} onPress={() => navigate('AddPatient')}>
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
  infoContainerFooter: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
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

module.exports = TreatingStep4Screen;