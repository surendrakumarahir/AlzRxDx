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

class DiagnosisStep1Screen extends Component {
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
                  <Text style={sharedStyles.navigationHeadertext}>Diagnosis</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <ScrollView style={sharedStyles.infoContainer}>
              <Text style={sharedStyles.infoHeaderYellow}>Diagnostic Workup</Text>
              <Text style={[sharedStyles.infoText, sharedStyles.marginBottom40]}>
                Based on results of Screen Protocol. Evaluation to be conducted
                by PCP/Neurologist/Psychiatrist as appropriate.{"\n\n"}
                <Text style={sharedStyles.questionText}>
                  Detailed History:
                </Text>{"\n"}
                Informant Interview (QDRS, IQCODE, AD8),
                Cognition, Function and/or Behavior Changes{"\n\n"}
                <Text style={sharedStyles.questionText}>
                  Neurological exam{"\n\n"}
                </Text>
                <Text style={sharedStyles.questionText}>
                  Mental Status Test:{"\n"}
                </Text>
                MOCA or SLUMS{"\n\n"}
                <Text style={sharedStyles.questionText}>
                  Depression Screening:{"\n"}
                </Text>
                Geriatric Depression Scale 7 Item{"\n"}
                PHQ-9 and/or Structured Questions
              </Text>

              <View style={sharedStyles.buttonContainer}>
                <View style={sharedStyles.marginBottom10}>
                  <View style={[sharedStyles.button, customStyles.greenBackground]}>
                    <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.greenBackground]} onPress={() => navigate('DiagnosisNormal')}>
                        <View style={[sharedStyles.buttonBackground, customStyles.greenBackground]}>
                          <Text style={sharedStyles.buttonText}>If MOCA or SLUMS Normal</Text>
                        </View>
                    </TouchableElement>
                  </View>
                </View>

                <View style={sharedStyles.marginBottom10}>
                  <View style={[sharedStyles.button, customStyles.redBackground]}>
                    <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.redBackground]} onPress={() => navigate('DiagnosisRed1')}>
                        <View style={[sharedStyles.buttonBackground, customStyles.redBackground]}>
                          <Text style={sharedStyles.buttonText}>If MOCA {"≤"}25 or SLUMS {"≤"}26</Text>
                        </View>
                    </TouchableElement>
                  </View>
                </View>

                <View style={sharedStyles.marginBottom100}>
                  <View style={[sharedStyles.button, customStyles.lightPurpleBackground]}>
                    <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.lightPurpleBackground]} onPress={() => navigate('AddPatient')}>
                        <View style={[sharedStyles.buttonBackground, customStyles.lightPurpleBackground]}>
                          <Text style={sharedStyles.buttonText}>Add Patient & Start Screening</Text>
                        </View>
                    </TouchableElement>
                  </View>
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

module.exports = DiagnosisStep1Screen;