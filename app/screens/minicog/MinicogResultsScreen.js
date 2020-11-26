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
import realm from '../../Models';
import { uploadResult } from '../../Result';
import { NavigationActions } from 'react-navigation'

class MinicogResultsScreen extends Component {
  constructor() {
    super();

    var _this = this;


    this.state = {
      result: {},
    };
  }

  submitScore(navigate) {
    var comment = null;
    if (this.state.result != null && this.state.result != undefined && this.state.result.comment != null && this.state.result.comment != undefined) {
      comment = this.state.result.comment
    }
    var _this = this

    var test = realm.objects('Test').filtered('id == "' + this.state.testId + '"')[0];
    var patient = realm.objects('Patient').filtered('id == "' + this.state.patientId + '"')[0];
    if (test != null && test != undefined && patient != null && patient != undefined) {
      var result = null;
      var resultData = {
          id: "temp",
          testId: this.state.testId,
          test: test,
          testCode: test.code,
          date: new Date(),
          patient: patient,
          patientId: this.state.patientId,
          score1: this.state.wordsRecallPoints,
          score2: this.state.clockPoints,
          scoreTotal: this.state.wordsRecallPoints + this.state.clockPoints,
          wordsListVersion: this.state.wordsVersion,
          comment: comment,
        };
      realm.write(() => {
        result = realm.create('Result', resultData);
      });
      uploadResult(result, function(err) {
        if (err) {
          Alert.alert(err.title, err.message, [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ], { cancelable: false });
        } else {
          const resetAction = NavigationActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'ActivePatients'}),
              NavigationActions.navigate({ routeName: 'PatientInfo', params: { patientId: resultData.patientId }}),
            ]
          });
          _this.props.navigation.dispatch(resetAction);
        }
      });
    }
  }

  static navigationOptions = {
    title: 'Screening Home Screen',
    header: null,
  };

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
      if (params.wordsVersion != null && params.wordsVersion != undefined) {
        this.setState({wordsVersion: params.wordsVersion});
      }
      if (params.clockPoints != null && params.clockPoints != undefined) {
        this.setState({clockPoints: params.clockPoints});
      }
      if (params.wordsRecallPoints != null && params.wordsRecallPoints != undefined) {
        this.setState({wordsRecallPoints: params.wordsRecallPoints});
      }
    }
  }


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
                  <Text style={sharedStyles.navigationHeadertext}>Mini-Cog™</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>
            <ScrollView>
              <View style={[sharedStyles.scoresContainer, sharedStyles.marginTop20]}>
                <Text style={sharedStyles.scoresTitle}>Scoring</Text>
                <Text style={sharedStyles.patientTestDescription}>
                  A cut point of {"<"} 3 on the Mini-Cog™ has been validated for
                  dementia screening,
                  but many individuals with clinically meaningful cognitive
                  impairment will score higher. When greater sensitivity
                  is desired, a cut point of {"<"}4 is recommended as it may
                  indicate a need for further evaluation of cognitive status.
                </Text>
                <View style={sharedStyles.centeredView}>
                  <Text style={sharedStyles.scoreText}>{this.state.wordsRecallPoints + this.state.clockPoints}</Text>
                  <Text style={sharedStyles.scoreComment}>Total Mini-Cog™ Score</Text>
                </View>
              </View>


              <View style={[customStyles.buttonsContainer, sharedStyles.buttonContainer]}>
                <View style={sharedStyles.marginBottom10}>
                  <View style={[sharedStyles.button, customStyles.addCommentButton]}>
                    <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.addCommentButton]} onPress={() => navigate('AddComment', { result: this.state.result })}>
                        <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                          <Text style={sharedStyles.buttonText}>Add Comments</Text>
                        </View>
                    </TouchableElement>
                  </View>
                </View>
                <View style={[sharedStyles.button, customStyles.submitScoreButton]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.submitScoreButton]} onPress={() => this.submitScore(navigate)}>
                      <View style={[sharedStyles.buttonBackground, customStyles.submitScoreButton]}>
                        <Text style={sharedStyles.buttonText}>Submit Test Score</Text>
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
  buttonContainer: {
    width: 40,
  },
  answerText: {
    textAlign: 'center'
  },
  answerTextContainer: {
    height: 30,
  },
  answerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  customAnswerImage: {
    height: 22,
    width: 22,
  },
  addCommentButton: {
    backgroundColor: AppConstants.colorPurpleLight,
  },
  submitScoreButton: {
    backgroundColor: AppConstants.colorTextGreen,
  },
  buttonsContainer: {
    marginBottom: 10,
  },
});

module.exports = MinicogResultsScreen;