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

import realm from '../../Models';
import sharedStyles from '../../Styles';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout, screenWidth } from '../../DrawerScreen';
import AppConstants from '../../AppConstants';
import { PatientTests } from '../../models/PatientTests';
import { uploadResult } from '../../Result';
import { NavigationActions } from 'react-navigation'


class TestResultsScreen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      currentTest: null,
      result: { comment: null },
    };
  }

  static navigationOptions = {
    title: 'Screening Home Screen',
    header: null,
  };

  submitScore(navigate) {
    var comment = null;
    if (this.state.result != null && this.state.result != undefined && this.state.result.comment != null && this.state.result.comment != undefined) {
      comment = this.state.result.comment
    }
    // var score = {
    //   comment: comment,
    //   score: this.state.testPoints,
    //   score1: this.state.testPoints1,
    //   score2: this.state.testPoints2,
    //   patientId: this.state.patientId,
    //   testId: this.state.testId,
    // }
    var _this = this

    var test = realm.objects('Test').filtered('id == "' + this.state.testId + '"')[0];
    var patient = realm.objects('Patient').filtered('id == "' + this.state.patientId + '"')[0];
    if (test != null && test != undefined && patient != null && patient != undefined) {
      var result = null;
      var resultData = {
          id: "temp",
          date: new Date(),
          testId: this.state.testId,
          test: test,
          testCode: test.code,
          patient: patient,
          patientId: this.state.patientId,
          score1: this.state.testPoints1,
          score2: this.state.testPoints2,
          scoreTotal: this.state.testPoints,
          wordsListVersion: null,
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

  componentWillMount() {
    const { navigate, goBack, state } = this.props.navigation;
    if (state != null && state != undefined && state.params != null && state.params != undefined) {
      var params = state.params
      if (params.testPoints != null && params.testPoints != undefined && params.testCode != null && params.testCode != undefined) {
        var testPoints = params.testPoints;
        this.setState({testPoints: testPoints});
        var currentTest = PatientTests()[params.testCode];
        this.setState({currentTest: currentTest});
      }
      if (params.testPoints1 != null && params.testPoints1 != undefined) {
        var testPoints1 = params.testPoints1;
        this.setState({testPoints1: testPoints1});
      }
      if (params.testPoints2 != null && params.testPoints2 != undefined) {
        var testPoints2 = params.testPoints2;
        this.setState({testPoints2: testPoints2});
      }
      if (params.patientId != null && params.patientId != undefined) {
        this.setState({patientId: params.patientId});
      }
      if (params.testId != null && params.testId != undefined) {
        this.setState({testId: params.testId});
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
                  <Text style={sharedStyles.navigationHeadertext}>{this.state.currentTest.screenTitle}</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>
            <ScrollView contentInset={{top: 0, left: 0, right: 0, bottom: 40}}>
              <View style={sharedStyles.scoresContainer}>
                <Text style={sharedStyles.scoresTitle}>Scoring</Text>
                {this.state.currentTest.pointsContainer(this.state.testPoints1, this.state.testPoints2)}
                <View style={sharedStyles.centeredView}>
                  <Text style={sharedStyles.scoreText}>{this.state.testPoints}</Text>
                  <Text style={sharedStyles.scoreComment}>{this.state.currentTest.scoreComment}</Text>
                </View>
              </View>
              <View style={[sharedStyles.scoreButtonsContainer, sharedStyles.buttonContainer]}>
                <View style={sharedStyles.marginBottom10}>
                  <View style={[sharedStyles.button, customStyles.addCommentButton]}>
                    <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.addCommentButton]} onPress={() => navigate('AddComment', { result: this.state.result })}>
                        <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                          <Text style={sharedStyles.buttonText}>Add Comments</Text>
                        </View>
                    </TouchableElement>
                  </View>
                </View>
                <View style={[sharedStyles.button, customStyles.submitScoreButton, sharedStyles.marginTop5]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.submitScoreButton, sharedStyles.marginTop5]} onPress={() => this.submitScore(navigate)}>
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
  addCommentButton: {
    backgroundColor: AppConstants.colorPurpleLight,
  },
  submitScoreButton: {
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

module.exports = TestResultsScreen;