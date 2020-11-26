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


class MinicogStep4Screen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data = [
        {label: '1', isSelected: false},
        {label: '2', isSelected: false},
        {label: '3', isSelected: false},
        {label: '4', isSelected: false},
        {label: '5', isSelected: false},
        {label: '6', isSelected: false},
      ]

    this.state = {
      currentTest: null,
      data: data,
      dataSource: ds.cloneWithRows(data),
      selectedVersion: null,
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
    }

    // Select first answer:
    // this.selectButton(0);
  }

  navigateNext(navigate, state) {
    var selectedVersion = parseInt(this.state.selectedVersion);
    console.log("SELECTED VERSION");
    console.log(selectedVersion);
    if (selectedVersion == null || selectedVersion == undefined || isNaN(selectedVersion) || selectedVersion < 0 || selectedVersion > 6) {
      Alert.alert('Error', 'Please words list version number', [
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ], { cancelable: true });
        return
    }
    return navigate('MinicogStep5', {
      testId: this.state.testId,
      patientId: this.state.patientId,
      testPoints: this.state.testPoints,
      wordsVersion: selectedVersion
    });
  }

  selectButton(index) {
    this.state.selectedVersion = index
    var newData = JSON.parse(JSON.stringify(this.state.data));
    newData[index].isSelected = true
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
    });
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
        <TouchableElement underlayColor={'#cdcdcd'} key={rowIndex} onPress={() => this.selectButton(rowIndex) }>
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
            <View style={sharedStyles.minicogMainContainer}>
              <View style={[sharedStyles.patientTestContainer]}>
                <Text style={sharedStyles.patientTestTopTitle}>Step 3</Text>
                <Text style={sharedStyles.patientTestTitle}>Three Word Recall</Text>
                <Text style={sharedStyles.patientTestDescription}>
                  <Text style={sharedStyles.questionText}>Test Preparation{"\n"}</Text>
                  Ask the person to recall the three words you stated in Step 1.
                  Say: “What were the three words I asked you to remember?”
                  {"\n\n"}
                  Record the word list version number used below.
                </Text>
                <View style={customStyles.buttonsContainer}>
                    <ListView
                      contentContainerStyle={sharedStyles.centeredListView}
                      horizontal={true}
                      enableEmptySections={true}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)} />
                </View>
              </View>
              <View style={sharedStyles.flex}></View>
              <View style={[sharedStyles.button]}>
                <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button]} onPress={() => this.navigateNext(navigate, this.state) }>
                    <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                      <Text style={sharedStyles.buttonText}>Enter Test Scores</Text>
                    </View>
                </TouchableElement>
              </View>
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
  }
});

module.exports = MinicogStep4Screen;