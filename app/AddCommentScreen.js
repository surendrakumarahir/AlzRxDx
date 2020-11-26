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
} from 'react-native';

import realm from './Models';
import { uploadResult } from './Result';
import sharedStyles from './Styles';
import DrawerLayout from 'react-native-drawer-layout';
import { openDrawer, drawerLayout } from './DrawerScreen';
import Dimensions from 'Dimensions';

const submitScore = function(rowData, navigate) {
  navigate('SubmitScore');
}

class AddCommentScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
    header: null,
  };

  textHeight() {
    if (Platform.OS === 'android') {
      return Dimensions.get('window').height - Dimensions.get('window').height * 0.31
    } else {
      return Dimensions.get('window').height - Dimensions.get('window').height * 0.275
    }
  }

  constructor() {
    super();

    this.state = {
      comment: null,
      bottomInset: 0,
      textHeight: this.textHeight(),
    };
  }

  componentWillUnmount() {
    if (this.state.result != null && this.state.result != undefined) {
      realm.write(() => {
        this.state.result.comment = this.state.comment;
      });
      if (this.state.uploadOnClose === true) {
        // upload result to server
        uploadResult(this.state.result, function(err) {
          if (err) {
            Alert.alert(err.title, err.message, [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ], { cancelable: false });
          }
        });
      }
    }
  }

  componentWillMount() {
    const { navigate, goBack, state } = this.props.navigation;
    if (state != null && state != undefined && state.params != null && state.params != undefined) {
      // state.params.comment != null && state.params.comment != undefined) {
      var params = state.params
      if (params.result != null && params.result != undefined) {
        this.state.result = params.result;
        this.state.comment = params.result.comment;
      }
      if (params.uploadOnClose === true) {
        this.state.uploadOnClose = true
      }
    }
  }

  onFinish(goBack) {
    this.refs._textInput.blur();
    goBack()
  }


  onKeyboardHide() {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    this.setState({bottomInset: 0, textHeight: this.textHeight(),})
  }

  onkeyboardShow() {
    this.setState({bottomInset: 230, textHeight: this.textHeight() - 230})
  }

  render() {
    const { navigate, goBack, state } = this.props.navigation;

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }

    return (
      <DrawerLayout
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Right}
        ref={'DRAWER_REF'}
        renderNavigationView={() => drawerLayout(this, navigate, state.routeName, this.refs['DRAWER_REF']) }>
        <View style={customStyles.container}>
          <View style={customStyles.body}>
            <View style={sharedStyles.blueContainer}>
              <View style={sharedStyles.navigationBar}>
                {/*Back button*/}
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => this.onFinish(goBack) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_arrow_back.png')}></Image>
                </TouchableElement>
                <View style={sharedStyles.navigationSeparator}>
                  <Text style={sharedStyles.navigationHeadertext}>{this.state && this.state.result && this.state.result.test ? this.state.result.test.shortName : ''}</Text>
                </View>
                <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
                  <Image style={sharedStyles.navigationBarLeftButton} source={require('../img/icon_hamburger.png')}></Image>
                </TouchableElement>
              </View>
            </View>

            <ScrollView
              ref='_scrollView'
              keyboardShouldPersistTaps={'handled'}
              alwaysBounceVertical={false}
              contentInset={{top: 0, left: 0, right: 0, bottom: this.state.bottomInset}}>

              <TextInput
                ref='_textInput'
                onFocus={() => {this.onkeyboardShow()}}
                onEndEditing={() => {this.onKeyboardHide()}}
                style={[customStyles.textFieldStyle, {height: (Platform.OS === 'ios') ? this.state.textHeight : this.state.textHeight}]}
                placeholderTextColor='#888888'
                placeholder="Enter comments..."
                multiline={true}
                textAlignVertical={'top'}
                value={this.state.comment}
                onChangeText={(searchString) => {this.setState({comment: searchString})}}
                underlineColorAndroid="transparent"/>

              <View style={sharedStyles.buttonContainer}>
                <View style={[sharedStyles.button, customStyles.button]}>
                  <TouchableElement underlayColor={'#cdcdcd'} style={sharedStyles.button} onPress={() => this.onFinish(goBack)}>
                    <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
                      <Text style={sharedStyles.buttonText}>Submit</Text>
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
    padding: 10,
  },
  patientIDLabel: {

  },
  patientIDNumber: {
    fontWeight: 'bold',
  },
  whiteContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  },
  textFieldStyle: {
    color: '#424242',
    fontSize: 16,
    flex: 1,
    margin: 10,
  }
});

module.exports = AddCommentScreen;