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

class MinicogStep5Screen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataWordsRecall = [
        {label: '0', points: 0, isSelected: false, type: 'wordsRecall' },
        {label: '1', points: 1, isSelected: false, type: 'wordsRecall' },
        {label: '2', points: 2, isSelected: false, type: 'wordsRecall' },
        {label: '3', points: 3, isSelected: false, type: 'wordsRecall' },
      ]

    var dataClock = [
        {label: '0', points: 0, isSelected: false, type: 'clock' },
        {label: '2', points: 2, isSelected: false, type: 'clock' },
    ]

    this.state = {
      currentTest: null,
      dataWordsRecall: dataWordsRecall,
      dataClock: dataClock,
      dataSourceWordsRecall: ds.cloneWithRows(dataWordsRecall),
      dataSourceClock: ds.cloneWithRows(dataClock),
      wordsRecallPoints: null,
      clockPoints: null
    };
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
    }

    // Select first answer:
    // this.selectButton(this.state.dataClock[0], 0);
    // this.selectButton(this.state.dataWordsRecall[0], 0);
  }

  navigateNext(navigate, state) {
    var wordsVersion = this.state.wordsVersion;
    var clockPoints = this.state.clockPoints;
    var wordsRecallPoints = this.state.wordsRecallPoints;

    if (
      clockPoints == null || clockPoints == undefined ||
      wordsRecallPoints == null || wordsRecallPoints == undefined
    ) {
      Alert.alert('Error', 'Please answer on all questions', [
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ], { cancelable: true });
        return
    }
    return navigate('MinicogResults', {
      testId: this.state.testId,
      patientId: this.state.patientId,
      testPoints: this.state.testPoints,
      wordsVersion: wordsVersion,
      clockPoints: clockPoints,
      wordsRecallPoints: wordsRecallPoints,
    });
  }

  selectButton(data, index) {
    if (data.type == 'clock') {
      this.state.clockPoints = data.points
      var newData = JSON.parse(JSON.stringify(this.state.dataClock));
      newData[index].isSelected = true
      this.setState({
        dataSourceClock: this.state.dataSourceClock.cloneWithRows(newData),
      });
    } else {
      this.state.wordsRecallPoints = data.points
      var newData = JSON.parse(JSON.stringify(this.state.dataWordsRecall));
      newData[index].isSelected = true
      this.setState({
        dataSourceWordsRecall: this.state.dataSourceWordsRecall.cloneWithRows(newData),
      });
    }
  }

  renderRow(rowData, sectionIndex, rowIndex) {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

      var image = <Image style={customStyles.customAnswerImage} source={require('../../../img/circle_unselected.png')}/>
      if (rowData.isSelected == true) {
        image = <Image style={customStyles.customAnswerImage} source={require('../../../img/circle_selected.png')}/>
      }

      return (
        <TouchableElement underlayColor={'#cdcdcd'} key={rowIndex} onPress={() => this.selectButton(rowData, rowIndex) }>
          <View style={customStyles.buttonContainer}>
            <View style={customStyles.answerImageContainer}>{image}</View>
            <View style={customStyles.answerTextContainer}><Text style={customStyles.answerText}>{rowData.label}</Text></View>
          </View>
        </TouchableElement>
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
                  <Text style={sharedStyles.navigationHeadertext}>Mini-Cog™
                  </Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>
            <ScrollView style={sharedStyles.minicogMainContainer} contentInset={{top: 0, left: 0, right: 0, bottom: 20}}>
              <View style={[sharedStyles.patientTestContainer, sharedStyles.marginTop20]}>
                <Text style={[sharedStyles.patientTestTitle, customStyles.headerTitle]}>Scoring</Text>
                <Text style={sharedStyles.patientTestDescription}>
                  <Text style={sharedStyles.patientTestTitle}>Word Recall: </Text>
                  (0-3 points){"\n"}
                  1 point for each word spontaneously recalled without cueing.
                </Text>
                <ListView
                      contentContainerStyle={sharedStyles.centeredListView}
                      horizontal={true}
                      enableEmptySections={true}
                      dataSource={this.state.dataSourceWordsRecall}
                      renderRow={this.renderRow.bind(this)} />

                <Text style={sharedStyles.patientTestDescription}>
                  <Text style={sharedStyles.patientTestTitle}>Clock Draw: </Text>
                  (0 or 2 points){"\n"}
                  Normal clock = 2 points. A normal clock has all numbers
                  placed in the correct sequence and approximately correct
                  position (e.g., 12, 3, 6 and 9 are in anchor positions)
                  with no missing or duplicate numbers.
                  Hands are pointing to the 11 and 2 (11:10).
                  Hand length is not scored. {"\n\n"}
                  Inability or refusal to draw a clock (abnormal) = 0 points.
                </Text>

                <ListView
                      contentContainerStyle={sharedStyles.centeredListView}
                      horizontal={true}
                      enableEmptySections={true}
                      dataSource={this.state.dataSourceClock}
                      renderRow={this.renderRow.bind(this)} />
              </View>
              <View style={sharedStyles.flex}></View>

              <View style={sharedStyles.marginBottom40}>
                <View style={[sharedStyles.button, sharedStyles.marginTop20]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button]} onPress={() => this.navigateNext(navigate, this.state)}>
                      <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                        <Text style={sharedStyles.buttonText}>Enter Test Scores</Text>
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
  headerTitle: {
    marginTop: 20,
  }
});

module.exports = MinicogStep5Screen;