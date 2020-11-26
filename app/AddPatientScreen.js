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
  AsyncStorage,
  Alert,
} from 'react-native';

import sharedStyles from './Styles';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout, screenWidth } from './DrawerScreen';
import AppConstants from './AppConstants';

const buttonTapped = function(state, navigate) {
  AsyncStorage.getItem('@appDataStore:sessionToken').then((value) => {
    if (value !== null){
      var number = state.number;
      fetch(AppConstants.hostName + '/api/v1/patients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: value,
          patient: {
            number: number,
          }
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (
          responseJson != null && responseJson != undefined &&
          responseJson.patient != null && responseJson.patient != undefined
        ) {
          var patientId = responseJson.patient.id;
          navigate('ActivePatients');
        } else {
          if (responseJson != null && responseJson != undefined &&
            Array.isArray(responseJson.errors) && responseJson.errors[0]
          ) {
            Alert.alert('Error', responseJson.errors[0], [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
          } else {
            Alert.alert('Error #491', 'Failed to create patient. Please try again', [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
          }
        }
        return true;
      })
      .catch((error) => {

        console.log(error);
        if (error != null && error != undefined &&
            Array.isArray(error.errors) && error.error.first
          ) {
            Alert.alert('Error', error.error.first, [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
          } else {

            Alert.alert('Error #501', 'Failed to create patient. Please try again', [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ], { cancelable: false });
          }
      });
    }
  }).done();
}

class AddPatientScreen extends Component {
  constructor() {
    super();
    this.state = {
      number: null,
      bottomInset: 0
    };
  }


  onKeyboardHide() {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    this.setState({bottomInset: 0})
  }

  onkeyboardShow() {
    this.setState({bottomInset: 230})
  }

  static navigationOptions = {
    title: 'Add Patient',
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
        <ScrollView
          ref='_scrollView'
          keyboardShouldPersistTaps={'handled'}
          alwaysBounceVertical={false}
          contentInset={{top: 0, left: 0, right: 0, bottom: this.state.bottomInset}}
          style={customStyles.container}>
          <View style={customStyles.body}>
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                {/*Back button*/}
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack() }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_arrow_back.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>Add Patient</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
              <Image source={require('../img/icon_add_avatar.png')} style={sharedStyles.addAccountImage}/>
            </View>

            <View style={customStyles.descriptionContainer}>
              <Text style={customStyles.noteText}>
                Patient profiles can be created or accessed by inputting
                the patient identifier provided by the physician{"'"}s electronic
                health record system.
              </Text>
            </View>

            <View style={customStyles.whiteContainer}>
              <View style={sharedStyles.textFieldContainerWithBorder}>
                  <TextInput
                      onFocus={() => {this.onkeyboardShow()}}
                      onEndEditing={() => {this.onKeyboardHide()}}
                      returnKeyType={'done'}
                      onSubmitEditing={() => { buttonTapped(this.state, navigate) } }
                      style={sharedStyles.textFieldStyle}
                      placeholder="Enter Patient ID"
                      value={this.state.number}
                      onChangeText={(searchString) => {this.setState({number: searchString})}}
                      underlineColorAndroid="transparent"/>
                  <TouchableElement underlayColor={'#cdcdcd'} style={customStyles.clearTextButton} onPress={() => this.setState({number: null})}>
                    <Image style={[sharedStyles.textFieldIcon, customStyles.textFieldIcon]} source={require('../img/icon_cross_grey.png')}></Image>
                  </TouchableElement>
              </View>
            </View>

            <View style={[customStyles.footer, sharedStyles.buttonContainer]}>
              <View style={[sharedStyles.button, customStyles.button]}>
                <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button]} onPress={() => buttonTapped(this.state, navigate)}>
                      <View style={[sharedStyles.buttonBackground, customStyles.buttonBackground]}>
                        <Text style={sharedStyles.buttonText}>Create Profile</Text>
                      </View>
                  </TouchableElement>
              </View>
            </View>
          </View>
        </ScrollView>
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
  signInText: {
    color: 'grey',
  },
  signInButton: {
    marginLeft: 2,
    color: 'black',
  },
  addAccountImage: {
    width: 130,
    height: 140,
    marginBottom: 40,
    marginTop: 10,
    marginLeft: 35,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 30,
    backgroundColor: AppConstants.colorPurpleLight,
  },
  whiteContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  descriptionContainer: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  noteText: {
    fontFamily: AppConstants.fontLight,
  },
  buttonBackground: {
    backgroundColor: AppConstants.colorPurpleLight,
  },
  footer: {
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerLinksContainer: {
    flexDirection:'row',
  },
  textFieldIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginBottom: 5,
  },

});

module.exports = AddPatientScreen;