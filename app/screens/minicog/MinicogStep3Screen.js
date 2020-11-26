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

class MinicogStep3Screen extends Component {
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
  }

  navigateNext(navigate, state) {
    return navigate('MinicogStep4', {
      testId: this.state.testId,
      patientId: this.state.patientId,
      testPoints: this.state.testPoints,
    });
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
            <ScrollView style={sharedStyles.minicogMainContainer} contentInset={{top: 0, left: 0, right: 0, bottom: 40}}>
              <View style={[sharedStyles.patientTestContainer]}>
                <Text style={sharedStyles.patientTestTopTitle}>Step 2</Text>
                <Text style={sharedStyles.patientTestTitle}>Clock Drawing</Text>
                <Text style={sharedStyles.patientTestDescription}>
                  <Text style={sharedStyles.questionText}>Test Preparation{"\n"}</Text>
                  Use preprinted Clock Drawing test from the Physicians
                  booklet on page 36 for this exercise. Repeat instructions
                  as needed as this is not a memory test.{"\n\n"}

                  Say: “Next, I want you to draw a clock for me.
                  First, put in all of the numbers where they go.”
                  When that is completed, say:
                  “Now, set the hands to 10 past 11.”{"\n\n"}

                  Move to Step 3 if the clock is not complete
                  within three minutes.
                </Text>
              </View>
              <View style={[sharedStyles.nextButtonContainer, sharedStyles.marginBottom20]}>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => this.navigateNext(navigate, this.state) }>
                  <Image style={sharedStyles.nextTestButton} source={require('../../../img/next_test_button.png')}/>
                </TouchableElement>
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
});

module.exports = MinicogStep3Screen;