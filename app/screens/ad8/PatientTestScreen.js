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
import { PatientTests } from '../../models/PatientTests';

const navigateNext = function(navigate, state) {
  var currentTest = state.currentTest;
  var startTestTo = state.startTestTo;

  // check if user has selected an answer in each question
  var shouldStop = false;

  var points1 = 0;
  var points2 = 0;

  for (var i=0; i < state.questionsData.length; i++) {
    var question = state.questionsData[i];
    var selected = 0;
    for (var y = 0; y < question.answers.length; y++) {
      var answer = question.answers[y];
      if (answer.isSelected == true) {
        selected += 1;
        if (question.type == 1) {
          points1 += answer.points;
        } else {
          points2 += answer.points;
        }
      }
    }

    // if (selected != 0) {
    if (selected != 1) {
      shouldStop = true;
    }
  }

  if (shouldStop === true) {
    // show alert
    Alert.alert('Error', 'Please answer on all available questions', [
          {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ], { cancelable: true });
  } else {
    var newPoints1 = state.testPoints1 + points1;
    var newPoints2 = state.testPoints2 + points2;
    var totalPoints = newPoints1 + newPoints2;
    if (state.showReviewScoreButton == true) {
      var screenName = state.currentTest.lastScreenName;
      var testCode = state.currentTest.code;
      if (testCode == "iqcode") {
        totalPoints = totalPoints / 16.0;
      }
      return navigate('TestResults', {
        testPoints: totalPoints,
        testPoints1: newPoints1,
        testPoints2: newPoints2,
        testCode: testCode,
        patientId: state.patientId,
        testId: state.testId,
      });
    } else {
      return navigate('PatientTest', {
        startTestFrom: startTestTo,
        startTestTo: startTestTo+currentTest.questionsPerPage,
        testCode: currentTest.code,
        testPoints: totalPoints,
        testPoints1: newPoints1,
        testPoints2: newPoints2,
        patientId: state.patientId,
        testId: state.testId,
      });
    }
  }


}

class PatientTestScreen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      currentTest: null,
      dataSource: ds.cloneWithRowsAndSections({}),
      hideHeader: false,
      questionsData: [],
      showReviewScoreButton: false,
    };
  }

  static navigationOptions = {
    title: 'Test Screen',
    header: null,
  };

  componentWillMount() {
    const { navigate, goBack, state } = this.props.navigation;
    if (state != null && state != undefined && state.params != null && state.params != undefined) {
      var params = state.params
      if (params.startTestFrom != null && params.startTestFrom != undefined && params.startTestTo != null && params.startTestTo != undefined && params.testCode != null && params.testCode != undefined) {
        var currentTestCode = params.testCode;
        var startTestFrom = params.startTestFrom;
        var startTestTo = params.startTestTo;
        if (startTestFrom == 0) {
          this.setState({hideHeader: false});
        } else {
          this.setState({hideHeader: true});
        }
        if (params.testPoints1 != null && params.testPoints1 != undefined) {
          this.setState({testPoints1: params.testPoints1});
        } else {
          this.setState({testPoints1: 0});
        }
        if (params.testPoints2 != null && params.testPoints2 != undefined) {
          this.setState({testPoints2: params.testPoints2});
        } else {
          this.setState({testPoints2: 0});
        }
        if (params.patientId != null && params.patientId != undefined) {
          this.setState({patientId: params.patientId});
        }
        if (params.testId != null && params.testId != undefined) {
          this.setState({testId: params.testId});
        }





        var currentTest = JSON.parse(JSON.stringify(PatientTests()[currentTestCode]));
        this.setState({currentTest: currentTest});

        var questionsData = currentTest.questions.slice(startTestFrom, startTestTo);
        this.setState({questionsData: questionsData});
        if (startTestFrom > 0 && startTestTo >= currentTest.questions.length) {
          // we are on the last page of a test, show reviewTestScore button
          this.setState({showReviewScoreButton: true});
        }

        this.setState({startTestTo: startTestTo});

        // // Select first optin by default
        // questionsData.forEach(function(section) {
        //   section.answers[0].isSelected = true
        // })

        this.generateTableData(questionsData);
      }
    }
  }

  onAnswerSelected(sectionIndex, rowIndex) {
    var newData = this.state.questionsData;
    var answers = newData[sectionIndex].answers;
    for (var i = 0; i < answers.length; i++) {
      var currentAnswer = answers[i];
      if (i == rowIndex) {
        currentAnswer.isSelected = true;
      } else {
        currentAnswer.isSelected = false;
      }
    }
    this.generateTableData(newData);
  }

  generateTableData(questionsData) {
    const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
          getRowData: (dataBlob, sectionIndex, rowIndex) => {
            return dataBlob[sectionIndex].answers[rowIndex]
          },
        });
    var rows = []
        for (var i = 0; i < questionsData.length; i++) {
          var question = questionsData[i];
          var r = [];
          for (var y = 0; y < question.answers.length; y++) {
              r.push(y);
          }
          rows.push(r);
        }
    this.setState({dataSource:  ds.cloneWithRowsAndSections(questionsData, null, rows)});
  }

  renderHeader() {
    if (this.state.currentTest == null) { return <View></View> }
    if (this.state.hideHeader === true) { return <View></View> }

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate, goBack } = this.props.navigation;
    var topTitle;
    if (this.state.currentTest.topTitle != null && this.state.currentTest.topTitle != undefined && this.state.currentTest.topTitle.length > 0) {
        topTitle = <Text style={sharedStyles.patientTestTopTitle}>{this.state.currentTest.topTitle}</Text>
    } else {
      topTitle = <View style={sharedStyles.marginBottom30}></View>
    }
    return (
      <View style={sharedStyles.patientTestContainer}>
        {topTitle}
        <Text style={sharedStyles.patientTestTitle}>{this.state.currentTest.name}</Text>
        <Text style={sharedStyles.patientTestDescription}>{this.state.currentTest.desc}</Text>
      </View>
    );
  }

  renderFooter() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate, goBack } = this.props.navigation;

    if (this.state.currentTest == null) { return <View></View> }
    if (this.state.showReviewScoreButton === true) {
      return (
        <View style={[sharedStyles.patientTestReviewScoreContainer, sharedStyles.buttonContainer]}>
          <View style={[sharedStyles.button]}>
            <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button]} onPress={() => navigateNext(navigate, this.state)}>
                <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                  <Text style={sharedStyles.buttonText}>Review Test Score</Text>
                </View>
            </TouchableElement>
          </View>
        </View>
      );
    } else {
      return (
      <View style={[sharedStyles.nextButtonContainerNoPadding, sharedStyles.marginBottom20]}>
        <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigateNext(navigate, this.state) }>
          <Image style={sharedStyles.nextTestButton} source={require('../../../img/next_test_button.png')}/>
        </TouchableElement>
      </View>
      );
    }
  }

  renderRow(rowData, sectionIndex, rowIndex) {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    const { navigate, goBack } = this.props.navigation;


    var answerImage = null;
    if (rowData.isSelected === true) {
      answerImage = <Image style={sharedStyles.answerImage} source={require('../../../img/circle_selected.png')}/>
    } else {
      answerImage = <Image style={sharedStyles.answerImage} source={require('../../../img/circle_unselected.png')}/>
    }
    return (
      <TouchableElement underlayColor={'#cdcdcd'} key={rowIndex} onPress={() => this.onAnswerSelected(sectionIndex, rowIndex)}>
        <View style={[sharedStyles.answerCellContainer, sharedStyles.paddingRight10]}>
          {answerImage}
          <Text style={sharedStyles.answerText}>{rowData.title}</Text>
        </View>
      </TouchableElement>
    );

  }

  renderSectionHeader(sectionData, category) {
    return (
      <View style={sharedStyles.questionContainer}>
        <Text style={sharedStyles.questionName}>{sectionData.title}</Text>
        <Text style={sharedStyles.questionText}>{sectionData.desc}</Text>
      </View>
    );
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
                  <Text style={sharedStyles.navigationHeadertext}>{this.state.currentTest ? this.state.currentTest.screenTitle : ''}</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>
            <View style={sharedStyles.testContainer}>
              <ListView
                style={sharedStyles.patientTestListView}
                enableEmptySections={true}
                renderHeader={this.renderHeader.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                dataSource={this.state.dataSource}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                renderRow={this.renderRow.bind(this)} />
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

module.exports = PatientTestScreen;