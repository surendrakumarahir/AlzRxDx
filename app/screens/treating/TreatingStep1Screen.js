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

class TreatingStep1Screen extends Component {
  constructor() {
    super();

    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  goHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
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
                  <Text style={sharedStyles.navigationHeadertext}>Treating Symptoms</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <ScrollView style={sharedStyles.infoContainer} contentInset={{top: 0, left: 0, right: 0, bottom: 40}}>
              <Text style={sharedStyles.infoHeaderBlue}>Describe</Text>
              <Text style={sharedStyles.infoText}>
                <Text style={sharedStyles.questionText}>
                    Caregiver describes behavioral factors:{"\n\n"}
                </Text>
                • Social & physical environment{"\n"}
                • Patient perspective{"\n"}
                • Degree of distress to patient and caregiver{"\n\n"}

                <Text style={sharedStyles.questionText}>
                  Look for:{"\n\n"}
                </Text>
                • Antecedents{"\n"}
                • Patterns{"\n"}
                • Context{"\n"}
                • Co-occurring events{"\n"}
              </Text>
              <View style={[sharedStyles.nextButtonContainer, sharedStyles.marginBottom20]}>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('TreatingStep2') }>
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
  infoContainerFooter: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  greenBackground: {
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


module.exports = TreatingStep1Screen;