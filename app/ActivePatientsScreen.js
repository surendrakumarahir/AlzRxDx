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

import sharedStyles from './Styles';
import Swipeout from 'react-native-swipeout';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout, screenWidth } from './DrawerScreen';
import realm from './Models';
import AppConstants from './AppConstants';
import PieChart from 'react-native-pie-chart';
import { deletePatient } from './models/Patient';
const { width, height } = Dimensions.get('window')


class ActivePatientsScreen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      patientsNumber: 0,
      bottomInset: 0,
    };
    this.updateData()

  }

  updateData() {
    AsyncStorage.getItem('@appDataStore:sessionToken').then((value) => {
        if (value !== null){
          // download patients from server
          fetch(`${AppConstants.hostName}/api/v1/patients?token=${encodeURIComponent(value)}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson != null && responseJson != undefined &&
              responseJson.patients != null && responseJson.patients != undefined
            ) {
              var patients = responseJson.patients;
              if (!Array.isArray(patients) && Array.isArray(JSON.parse(patients))) {
                patients = JSON.parse(patients);
              }
              if (Array.isArray(patients)) {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                var rows = [];

                // responseJson.patients.forEach(function(patient) {
                for (var i = 0; i < patients.length; i++) {
                  var patientJson = patients[i];
                  rows.push({
                    number: patientJson["number"],
                    name: patientJson["name"],
                    patientId: patientJson["id"],
                  })
                  realm.write(() => {
                    var existingPatient = realm.objects('Patient').filtered('id == "' + patientJson.id +'"');
                    var patientObject;
                    if (existingPatient.length == 0) {
                      patientObject = realm.create('Patient', {
                        id: patientJson['id'],
                        number: patientJson['number'],
                        name: patientJson['name'],
                      });
                    } else {
                      patientObject = existingPatient[0];
                      patientObject.number = patientJson['number']
                      patientObject.name = patientJson['name']
                    }
                    if (Array.isArray(patientJson["results"])) {
                      for (var y = 0; y < patientJson["results"].length; y++) {
                        // save/update result
                        var resultJson = patientJson["results"][y]
                        var existingResult = realm.objects('Result').filtered('id == "' + resultJson['id'] +'"');
                        var testObject = realm.objects('Test').filtered('id == "' + resultJson['test_id'] +'"')[0];
                        var resultObject;
                        if (existingResult.length == 0) {
                          resultObject = realm.create('Result', {
                            id: resultJson['id'],
                            patientId: patientObject.id,
                            testId: resultJson['test_id'],
                            testCode: resultJson['test_code'],
                            score1: resultJson['score1'],
                            score2: resultJson['score2'],
                            scoreTotal: resultJson['score_total'],
                            wordsListVersion: resultJson['words_list_version'],
                            comment: resultJson['comment'],
                            patient: patientObject,
                            test: testObject,
                            saved: true,
                          });
                        } else {
                          resultObject = existingResult[0];
                          resultObject.patientId = patientObject.id;
                          resultObject.testId = resultJson['test_id'];
                          resultObject.score1 = resultJson['score1'];
                          resultObject.score2 = resultJson['score2'];
                          resultObject.scoreTotal = resultJson['score_total'];
                          resultObject.wordsListVersion = resultJson['words_list_version'];
                          resultObject.patient = patientObject;
                          resultObject.test = testObject;
                          resultObject.saved = true;
                        }
                        if (patientObject.results.filtered('id == "' + resultObject.id + '"').length == 0) {
                          patientObject.results.push(resultObject);
                        }
                      }
                    }
                  });
                }
                this.setState({
                  data: rows,
                  dataSource: ds.cloneWithRows(rows),
                })
                this.setState({patientsNumber: rows.length})
              } else {
                Alert.alert('Error #2', 'Failed to get active patients; ' + error, [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ], { cancelable: false });
              }
            } else {
              Alert.alert('Error #3', 'Failed to get active patients; ' + error, [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ], { cancelable: false });
            }
            // this.setState({patientsNumber: realm.objects('Patient').length});
          }).catch((error) => {
            Alert.alert('Error #1', 'Failed to get active patients; ' + error, [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ], { cancelable: false });
          });
        }
      }).done();
  }

  filterPatients(query) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (query.length === 0) {
      this.setState({dataSource: ds.cloneWithRows(this.state.data)});

    } else {
      var data = JSON.parse(JSON.stringify(this.state.data));
      var filtered = []
      data.forEach(function(row) {
        if (row.name != null && row.name != undefined && row.name.indexOf(query) !== -1 ||
          row.number != null && row.number != undefined &&row.number.indexOf(query) !== -1) {
          filtered.push(row);
        }
      });
      this.setState({dataSource: ds.cloneWithRows(filtered)});
    }
  }

  static navigationOptions = {
    title: 'Home Screen',
    header: null,
  };

  onComeBackFromPatient(params) {
    this.updateData()
  }

  renderRow(rowData) {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate } = this.props.navigation;

    let swipeBtns = [{
      text: 'Delete',
      // image: require('../img/icon_arrow_back.png'),
      // icon: require('../img/icon_arrow_back.png'),

      backgroundColor: 'rgb(96,182,62)',
      onPress: () => { deletePatient(rowData, this, this.updateData.bind(this)); }
    }];

    var nextScreenParams = JSON.parse(JSON.stringify(rowData));
    nextScreenParams.onComeBackFromPatient = this.onComeBackFromPatient.bind(this)

    return (
      <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableElement underlayColor={'#cdcdcd'}
           onPress={() => {  navigate('PatientInfo', nextScreenParams)}}
          style={customStyles.rowStyle}>
          <View style={customStyles.rowContainer}>
            <Text style={customStyles.rowTitle}>{rowData.number}</Text>
            <View style={customStyles.rowSpacer}></View>
            <Text style={customStyles.rowViewStyle}>View</Text>
          </View>
        </TouchableElement>
      </Swipeout>
    )
  }


  onKeyboardHide() {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    this.setState({bottomInset: 0})
  }

  onkeyboardShow() {
    this.setState({bottomInset: 230})
  }

  focusOn(nextField) {
    this.refs[nextField].focus()
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
        <ScrollView
          ref='_scrollView'
          keyboardShouldPersistTaps={'handled'}
          alwaysBounceVertical={false}
          contentInset={{top: 0, left: 0, right: 0, bottom: this.state.bottomInset}}
          style={customStyles.container}>
          <View style={customStyles.body}>
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                {/*Plus button*/}
                {/*<TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('AddPatient')}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_plus.png')}></Image>
                </TouchableElement>*/}
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_arrow_back.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>Active Patients</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>


              <View style={sharedStyles.activePatientsTextContainer}>
                <PieChart
                    style={sharedStyles.pieChart}
                    chart_wh={(Platform.OS === 'ios') ? height * 0.247 : height * 0.24}
                    series={[this.state.patientsNumber, 100]}
                    sliceColor={['#FFFFFF', 'rgb(151,104,225)']}
                    doughnut={true}
                    coverRadius={0.95}
                    coverFill={AppConstants.colorPurple}/>
                <View style={sharedStyles.pieChartText}>
                  <Text style={sharedStyles.graphTextBig}>{this.state.patientsNumber}</Text>
                  <Text style={sharedStyles.graphTextSmall}>ACTIVE{"\n"}PATIENTS</Text>
                </View>
              </View>
            </View>

            <View style={customStyles.searchBarContainer}>
              <TextInput
                  onFocus={() => {this.onkeyboardShow()}}
                  onEndEditing={() => {this.onKeyboardHide()}}
                  style={customStyles.searchFieldStyle}
                  placeholder="Search"
                  onChangeText={(searchString) => { this.filterPatients(searchString)}}
                  underlineColorAndroid="transparent"/>
              <Image style={customStyles.searchIcon} source={require('../img/icon_search.png')}></Image>
            </View>

            <ListView
              style={customStyles.listView}
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)} />
          </View>
        </ScrollView>
      </DrawerLayout>
    );
  }
}

const customStyles = StyleSheet.create({
  listView: {
    flex: 1,
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
  footerLinksContainer: {
    flexDirection:'row',
  },
  searchBarContainer: {
    backgroundColor: 'rgb(240, 240, 240)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:  (Platform.OS === 'ios') ? width * 0.07 : width * 0.02,
    paddingBottom:  (Platform.OS === 'ios') ? width * 0.07 : width * 0.02,
    paddingLeft:  (Platform.OS === 'ios') ? width * 0.07 : width * 0.07,
    paddingRight:  (Platform.OS === 'ios') ? width * 0.07 : width * 0.07,
  },
  searchFieldStyle: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'rgb(240, 240, 240)',
    color: '#424242',
    fontFamily: AppConstants.fontLight,
    fontSize: 14,
  },
  searchIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'rgb(240, 240, 240)',
    resizeMode: 'contain',
  },
  rowStyle: {
    height: (Platform.OS === 'ios') ? height * 0.1 : 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowContainer: {
    flexDirection:'row',
    paddingTop: (Platform.OS === 'ios') ? height * 0.01 : height * 0.03,
    paddingBottom: (Platform.OS === 'ios') ? height * 0 : height * 0.03,
    paddingLeft: (Platform.OS === 'ios') ? width * 0 : width * 0.04,
    paddingRight: (Platform.OS === 'ios') ? width * 0 : width * 0.04,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  rowSpacer: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: AppConstants.fontRegular,
  },
  rowViewStyle: {
    color: AppConstants.colorPurple,
  },
});

module.exports = ActivePatientsScreen;