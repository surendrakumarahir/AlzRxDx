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
import { PatientTests } from './models/PatientTests';
import moment from 'moment';
import AppConstants from './AppConstants';
import PieChart from 'react-native-pie-chart';
import { deletePatient, sendEmail } from './models/Patient';
import prompt from 'react-native-prompt-android';
const { width, height } = Dimensions.get('window')



class PatientInfoScreen extends Component {
  constructor() {
    super();

    var _this = this;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    _this.state = {
      email: 'email@xample.com',
      dataSource: ds.cloneWithRows([])
    };
    AsyncStorage.getItem('@appDataStore:userEmail').then((value) => {
      _this.setState({email: value});
    }).done();

  }

  submitScore(rowData, navigate) {
    // var data = JSON.parse(JSON.stringify(rowData));
    rowData.onComeBackFromSubmitScore = this.onComeBackFromSubmitScore.bind(this)
    // data.onComeBackFromSubmitScore = this.onComeBackFromSubmitScore.bind(this)
    navigate('SubmitScore', rowData);
  }

startTest(rowData, navigate) {
  var tests = PatientTests();
  if (tests && tests[rowData.code] && tests[rowData.code].code) {
    navigate('PatientTest', {
      startTestFrom: 0,
      startTestTo: 1,
      testCode: tests[rowData.code].code,
      testPoints: 0,
      patientId: rowData.patientId,
      testId: rowData.testId,
    });
  } else if (rowData.code == 'minicog') {
    navigate('MinicogStep1', {
      testPoints: 0,
      patientId: rowData.patientId,
      testId: rowData.testId,
    })
  } else if (rowData.code == 'moca') {
    this.submitScore(rowData, navigate);
  } else if (rowData.code == 'slums') {
    this.submitScore(rowData, navigate);
  }
}

updateData() {
  let tests = realm.objects('Test');

    let testsData = []
    for (var i = 0; i < tests.length; i++) {
      let test = tests[i];
      var result = realm.objects('Result').filtered('saved == true AND testId == "' + test.id +'" AND patientId == "' + this.state.patientId + '"').sorted('date', true)[0];
      var resultExists = result != undefined && result != null;
      testsData.push({
        testId: test.id,
        name: test.shortName,
        code: test.code,
        patientId: this.state.patientId,
        resultId: resultExists ? result.id : null,
        result: resultExists ? result : null,
        date: resultExists ? result.date : null,
        score: resultExists ? result.scoreTotal : null,
        hasComment: resultExists ? result.comment != null && result.comment != undefined && result.comment.length > 0 : false,
        isManual: test.isManual,
        position: test.position,
      });
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      patientId: this.state.patientId,
      onComeBackFromPatient: this.state.onComeBackFromPatient,
      dataSource: ds.cloneWithRows(testsData)
    })
}

  static navigationOptions = {
    title: 'Patient Profile',
    header: null,
  };
  renderHeader() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={customStyles.tableHeaderContainer}>
        <View style={customStyles.tableHeader}>
          <Text style={customStyles.testLabel}>Tests</Text>
          <Text style={customStyles.scoresLabel}>Scores</Text>
        </View>
      </View>
    );
  }

  onDeleteTapped() {
    var _this = this;
    const { goBack } = this.props.navigation;

    deletePatient({patientId: this.state.patientId}, this, function() {
      if (_this.state && _this.state.onComeBackFromPatient != null && _this.state.onComeBackFromPatient != undefined) {
        _this.state.onComeBackFromPatient({});
      }
      goBack();
    });
  }

  onSendEmail() {
    prompt(
        'Email Address',
        'Where should we send email with test results?',
        [
         {text: 'Cancel', onPress: () => { console.log('Cancel Pressed') }, style: 'cancel'},
         {text: 'OK', onPress: textValue => {
              sendEmail(this.state.patientId, textValue, function() {
                Alert.alert('', 'Email has been successfully sent', [
                  {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                ], { cancelable: false });
              })
           }
         },
        ],
        {
            // type: 'secure-text',
            // cancelable: false,
            defaultValue: this.state.email ? this.state.email : null,
            placeholder: 'mail@example.com'
        }
    );
  }


  onComeBackFromSubmitScore(params) {
    this.updateData()
  }


  renderFooter() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate, goBack, state } = this.props.navigation;

    return (
      <View style={customStyles.footer}>
        <View style={sharedStyles.buttonContainer}>
          <View style={[sharedStyles.button]}>
            <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button]} onPress={() => this.onSendEmail()}>
                <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                  <Text style={sharedStyles.buttonText}>Email</Text>
                </View>
            </TouchableElement>
          </View>
          <TouchableElement underlayColor={'#cdcdcd'} onPress={() => this.onDeleteTapped() } >
            <Text style={customStyles.deletePatientText}>
              Delete Profile
            </Text>
          </TouchableElement>
        </View>
      </View>
    );
  }
  renderRow(rowData) {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate, goBack } = this.props.navigation;

    if (rowData && rowData.date != null) {
      // test has been passed
      var commentsContainer = <View></View>
      if (rowData.hasComment) {
        commentsContainer = (
          <View style={customStyles.cellInfoContainer}>
            <Text style={customStyles.rowViewStyle}> | </Text>
            <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('AddComment', {result: rowData.result, uploadOnClose: true}) } >
              <Text style={customStyles.rowViewStyle}>Comments</Text>
            </TouchableElement>
          </View>
        );
      }

            {/*onPress={() => this.submitScore( rowData, navigate, this )}*/}
      return (
        <TouchableElement underlayColor={'#cdcdcd'}
            onPress={() => this.startTest( rowData, navigate, this ) }
            style={customStyles.rowStyle}>
            <View style={customStyles.rowContainer}>
              <Image style={customStyles.checkmarkStyle} source={require('../img/green_checkmark.png')}></Image>
              <View style={customStyles.doubleLabelContainer}>
                <Text style={customStyles.note}>{rowData.name}</Text>
                {/*<Text style={customStyles.dateText}>{ moment(rowData.date).format('DD-MM-YYYY') }</Text>*/}
              </View>
              <View style={customStyles.rowSpacer}></View>
              <View style={customStyles.cellInfoContainer}>
                <Text style={customStyles.scoreText}>{rowData.score}</Text>
                {commentsContainer}
              </View>
            </View>
          </TouchableElement>
      )
    } else {
      var submitButton = <Text style={customStyles.rowViewStyle}>Start Test</Text>
      if (rowData.isManual === true) {
        submitButton = <Text style={customStyles.rowViewStyle}>Submit Score</Text>
      }
      // test not passed yet
      return (
        <TouchableElement underlayColor={'#cdcdcd'}
            onPress={() => this.startTest( rowData, navigate, this )}
            style={customStyles.rowStyle}>
            <View style={customStyles.rowContainer}>
              <Text style={customStyles.note}>{rowData.name}</Text>
              <View style={customStyles.rowSpacer}></View>
              {submitButton}
            </View>
          </TouchableElement>
      )
    }
  }

  componentWillMount() {
    const { state } = this.props.navigation;
    if (state != null && state != undefined && state.params != undefined && state.params != null) {
      if (state.params.onComeBackFromPatient) {
        this.state.onComeBackFromPatient = state.params.onComeBackFromPatient;
      }
      if (state.params.patientId != null && state.params.patientId != undefined) {
        this.state.patientId = state.params.patientId;
      }
    }

    this.updateData();
  }

  render() {
    const { navigate, goBack, state } = this.props.navigation;

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
        <View style={customStyles.container}>
          <View style={customStyles.body}>
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_arrow_back.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>Patient Profile</Text>
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
                  <Text style={sharedStyles.graphTextSmall}>TEST{completedTests == '1' ? '' : 'S'}{"\n"}COMPLETED</Text>
                </View>
              </View>
            </View>

            <View style={customStyles.patientIdContainer}>
              <Text style={customStyles.patientIDLabel}>Patient ID Number:</Text>
              <Text style={customStyles.patientIDNumber}>{patient.number}</Text>
            </View>


            <ListView
              renderHeader={this.renderHeader.bind(this)}
              renderFooter={this.renderFooter.bind(this)}
              dataSource={this.state.dataSource}
              stickySectionHeadersEnabled={false}
              renderRow={this.renderRow.bind(this)} />
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
    paddingTop: 40,
    paddingBottom: 10,
  },
  footerLinksContainer: {
    flexDirection:'row',
  },
  activePatientsTextContainer: {
    marginBottom: 15,
  },
  patientIdContainer: {
    backgroundColor: 'rgb(240, 240, 240)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? height * 0.03 : height * 0.02,
    paddingBottom: (Platform.OS === 'ios') ? height * 0.02 : height * 0.01,
    paddingLeft: (Platform.OS === 'ios') ? width * 0.01 : width * 0.04,
    paddingRight: (Platform.OS === 'ios') ? width * 0.01 : width * 0.04,

  },
  searchFieldStyle: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'rgb(240, 240, 240)',
    color: '#424242',
  },
  searchIcon: {
    width: 25,
    height: 25,
    backgroundColor: 'rgb(240, 240, 240)',
  },
  rowStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowContainer: {
    flexDirection:'row',
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: (Platform.OS === 'ios') ? width * 0 : width * 0.04,
    paddingRight: (Platform.OS === 'ios') ? width * 0 : width * 0.04,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    height: 53,
  },
  rowSpacer: {
    flex: 1,
  },
  rowViewStyle: {
    // color: 'blue',
    fontFamily: AppConstants.fontTitle,
    fontSize: 16,
  },
  note: {
    fontFamily: AppConstants.fontRegular,
    fontSize: 16,
  },
  patientIDLabel: {
    fontFamily: AppConstants.fontRegular,
    fontSize: 16,
  },
  patientIDNumber: {
    fontFamily: AppConstants.fontBold,
    fontSize: 24,
  },
  doubleLabelContainer: {
    justifyContent: 'center',
  },
  dateText: {
    color: 'grey',
  },
  checkmarkStyle: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
  deletePatientText: {
    color: 'gray',
    margin: 20,
  },
  tableHeaderContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    flexDirection:'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  testLabel: {
    flex: 1,
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurple,
    fontSize: 16,
  },
  scoresLabel: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurple,
    fontSize: 16,
  },
  scoreText: {
    color: 'rgb(96,182,64)',
    fontFamily: AppConstants.fontTitle,
    fontSize: 16,
  },
  cellInfoContainer: {
    flexDirection:'row',
  },
});

module.exports = PatientInfoScreen;