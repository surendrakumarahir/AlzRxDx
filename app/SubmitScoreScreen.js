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

import realm from './Models';
import sharedStyles from './Styles';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout, screenWidth } from './DrawerScreen';
import AppConstants from './AppConstants';
import { uploadResult } from './Result';
import PieChart from 'react-native-pie-chart';
const { width, height } = Dimensions.get('window')

const submitScore = function(rowData, navigate) {
  navigate('SubmitScore');
}

const submitResult = function(_this, goBack) {
  var result;
  if (_this.state.result.id == null || _this.state.result.id == undefined) {
    var test = realm.objects('Test').filtered('id == "' + _this.state.testId + '"')[0];
    var patient = realm.objects('Patient').filtered('id == "' + _this.state.patientId + '"')[0];
    var resultData = {
      testId: _this.state.result.testId,
      patientId: _this.state.result.patientId,
    }
    if (test != null && test != undefined) {
      resultData.test = test
      resultData.testCode = test.code
    }
    if (patient != null && patient != undefined) {
      resultData.patient = patient
    }
    realm.write(() => {
        result = realm.create('Result', resultData);
      });
  } else {
    result = realm.objects('Result').filtered('id == "' + _this.state.result.id + '" AND testId == "' + _this.state.result.testId +'" AND patientId == "' + _this.state.result.patientId + '"')[0];
  }
  if (result != null && result != undefined) {
    if (_this.state.score != null && _this.state.score != undefined && _this.state.score.length > 0) {
      realm.write(() => {
        result.score1 = parseInt(_this.state.score);
        result.scoreTotal = result.score1;
      });
      _this.state.result = result;

      uploadResult(result, function(err) {
        if (err) {
          Alert.alert(err.title, err.message, [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ], { cancelable: false });
        } else {
          if (_this.state.onComeBackFromSubmitScore) {
            _this.state.onComeBackFromSubmitScore({});
          }
          goBack();
        }
      });
    } else {
      Alert.alert('Error', "Please provide the Score", [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: false });
    }
  } else{
    console.log("!!! result is null");
  }

}

const updateData = function(_this, state) {

}

class PatientInfoScreen extends Component {
  static navigationOptions = {
    title: 'Submit Score',
    header: null,
  };

  constructor() {
    super();

    var _this = this;

    _this.state = {
      score: null,
      test: null,
      result: null,
      comment: null,
      bottomInset: 0
    };
  }

  componentWillMount() {
    const { navigate, goBack, state } = this.props.navigation;
    var result = realm.objects('Result').filtered('id == "' + state.params.resultId +'"')[0];
    var test;
    if (state.params && state.params.onComeBackFromSubmitScore) {
      this.state.onComeBackFromSubmitScore = state.params.onComeBackFromSubmitScore;
    }
    if (result == undefined || result == null) {
      test = realm.objects('Test').filtered('id == "' + state.params.testId +'"')[0];
      var patient = realm.objects('Patient').filtered('id == "' + state.params.patientId +'"')[0];
      result = realm.objects('Result').filtered('saved == false AND testId == "' + state.params.testId +'" AND patientId == "' + state.params.patientId + '"')[0];
      this.state.test = test;
      this.state.patient = patient;

      if (result == undefined || result == null) {
        realm.write(() => {

          var result = realm.create('Result', {
            id: "temp",
            testId: state.params.testId,
            test: test,
            testCode: test['code'],
            patient: patient,
            patientId: state.params.patientId,
          });
          this.state.result = result
        });

      } else {
        this.state.result = result
      }
    } else {
      test = result.test;
      this.state.test = test;
      this.state.result = result;
    }
    if (this.state != null && this.state != undefined && this.state.result != null && this.state.result != undefined &&
      this.state.result.scoreTotal != null && this.state.result.scoreTotal != undefined) {
      this.state.score = this.state.result.scoreTotal.toString();
    }

  }

  onKeyboardHide() {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    this.setState({bottomInset: 0})
  }

  onkeyboardShow() {
    this.setState({bottomInset: 250})
  }

  setScore(score) {
    var digits = score.replace(/\D/g,'');
    var number = parseInt(digits);
    if (number >= 0 && number <= 30) {
      this.setState({score: digits})
    } else if (number < 0) {
      this.setState({score: '0'});
    } else if (number > 30) {
      this.setState({score: '30'});
    } else {
      this.setState({score: ''});
    }
  }

  render() {
    const { navigate, goBack, state } = this.props.navigation;
    updateData(this, state);


    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

    const patient = realm.objects('Patient').filtered('id == "' + state.params.patientId +'"')[0];
    const results = realm.objects('Result').filtered('patientId == "' + state.params.patientId +'"');
    var completedTests = 0;
    var testIds = [];
    results.forEach(function(result) {
      if (testIds.indexOf(result.testId) === -1 && result.saved === true) {
        testIds.push(result.testId);
        completedTests += 1;
      }
    })

    return (
      <DrawerLayout
        drawerWidth={screenWidth()}
        drawerPosition={DrawerLayout.positions.Right}
        ref={'DRAWER_REF'}
        renderNavigationView={() => drawerLayout(this, navigate, state.routeName, this.refs['DRAWER_REF']) }>
        <ScrollView ref='_scrollView'
          // keyboardShouldPersistTaps={'handled'}
          // keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          alwaysBounceVertical={false}
          contentInset={{top: 0, left: 0, right: 0, bottom: this.state.bottomInset}}
          style={customStyles.container}>
          <View style={customStyles.body}>
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                {/*Cross button*/}
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/nav_bar_cross.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>{this.state.test.shortName}</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>


              <View style={sharedStyles.activePatientsTextContainer}>
                <PieChart
                    style={sharedStyles.pieChart}
                    chart_wh={(Platform.OS === 'ios') ? height * 0.247 : height * 0.24}
                    series={[completedTests, 7-completedTests]}
                    sliceColor={['#FFFFFF', 'rgb(151,104,225)']}
                    doughnut={true}
                    coverRadius={0.95}
                    coverFill={AppConstants.colorPurple}/>
                <View style={sharedStyles.pieChartText}>
                  <Text style={sharedStyles.graphTextBig}>{completedTests}</Text>
                  <Text style={sharedStyles.graphTextSmall}>TEST{"\n"}COMPLETED</Text>
                </View>
              </View>
            </View>

            <View style={customStyles.patientIdContainer}>
              <Text style={customStyles.patientIDLabel}>Patient ID Number:</Text>
              <Text style={customStyles.patientIDNumber}>{patient.number}</Text>
            </View>

            <View style={customStyles.whiteContainer}>
              <View style={sharedStyles.textFieldContainerWithBorder}>
                  <TextInput
                      onFocus={() => {this.onkeyboardShow()}}
                      onEndEditing={() => {this.onKeyboardHide()}}
                      keyboardType={'numeric'}
                      returnKeyType={'done'}
                      style={sharedStyles.textFieldStyle}
                      placeholder="Enter Score"
                      value={this.state.score}
                      onChangeText={(searchString) => {this.setScore(searchString)}}
                      underlineColorAndroid="transparent"/>
                  <TouchableElement underlayColor={'#cdcdcd'} onPress={() => { this.setState({score: '' }) } }>
                    <Image style={sharedStyles.textFieldIcon} source={require('../img/icon_cross_grey.png')}></Image>
                  </TouchableElement>
              </View>
            </View>
          </View>

          <View style={[customStyles.footer, sharedStyles.buttonContainer]}>
             <View style={[sharedStyles.button, customStyles.addCommentBackground, customStyles.buttonMargin, sharedStyles.marginBottom10]}>
              <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.addCommentBackground]} onPress={() => navigate('AddComment', { result: this.state.result })}>
                  <View style={[sharedStyles.buttonBackground, customStyles.addCommentBackground]}>
                    <Text style={sharedStyles.buttonText}>Add Comments</Text>
                  </View>
              </TouchableElement>
            </View>

            <View style={[sharedStyles.button, customStyles.submitButtonBackrground, sharedStyles.marginBottom10]}>
              <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.submitButtonBackrground]} onPress={() => submitResult(this, goBack)}>
                  <View style={[sharedStyles.buttonBackground, customStyles.submitButtonBackrground]}>
                    <Text style={sharedStyles.buttonText}>Submit</Text>
                  </View>
              </TouchableElement>
            </View>
          </View>
        </ScrollView>
      </DrawerLayout>
    );
  }
}

const customStyles = StyleSheet.create({
  addCommentBackground: {
    backgroundColor: AppConstants.colorPurpleLight,
  },
  submitButtonBackrground: {
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
    marginTop: 20,
  },
  footerLinksContainer: {
    flexDirection:'row',
  },
  activePatientsTextContainer: {
    marginBottom: 15,
  },
  activePatientsNumber: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center'
  },
  activePatientsLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  patientIdContainer: {
    backgroundColor: 'rgb(240, 240, 240)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? height * 0.03 : height * 0.02,
    paddingBottom: (Platform.OS === 'ios') ? height * 0.03 : height * 0.02,
    paddingLeft: (Platform.OS === 'ios') ? width * 0.01 : width * 0.04,
    paddingRight: (Platform.OS === 'ios') ? width * 0.01 : width * 0.04,

  },
  patientIDLabel: {

  },
  patientIDNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  whiteContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: (Platform.OS === 'ios') ? height * 0.07 : height * 0.05,
  },
  button: {
    marginTop: 10,
  }
});

module.exports = PatientInfoScreen;