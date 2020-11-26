// 'use strict';

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Platform,
//   Button,
//   Image,
//   TouchableHighlight,
//   TouchableNativeFeedback,
//   ScrollView,
//   ListView,
//   Alert,
//   AsyncStorage,
// } from 'react-native';

// import sharedStyles from '../../Styles';
// import DrawerLayout from 'react-native-drawer-layout';
// import { openDrawer, drawerLayout, screenWidth } from '../../DrawerScreen';
// import AppConstants from '../../AppConstants';
// import { PatientTests, onAnswerSelected } from '../../models/PatientTests';

// class Ad8Step1Screen extends Component {
//   constructor() {
//     super();

//     var _this = this;
//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     var currentTest = PatientTests()['ad8'];
//     this.state = {
//       currentTest: currentTest,
//       dataSource: ds.cloneWithRows(currentTest.questions.slice(0, 1)),
//     };
//   }

//   static navigationOptions = {
//     title: 'AD8 Home Screen',
//     header: null,
//   };

//   renderHeader() {
//     var TouchableElement = TouchableHighlight;
//     if (Platform.OS === 'android') {
//      TouchableElement = TouchableNativeFeedback;
//     }
//     const { navigate, goBack } = this.props.navigation;
//     return (
//       <View style={sharedStyles.patientTestContainer}>
//         <Text style={sharedStyles.patientTestTopTitle}>8 Questions:</Text>
//         <Text style={sharedStyles.patientTestTitle}>{this.state.currentTest.name}</Text>
//         <Text style={sharedStyles.patientTestDescription}>{this.state.currentTest.desc}</Text>
//       </View>
//     );
//   }

//   renderRow(rowData) {
//     var TouchableElement = TouchableHighlight;
//     if (Platform.OS === 'android') {
//      TouchableElement = TouchableNativeFeedback;
//     }
//     const { navigate, goBack } = this.props.navigation;


//     // generate answers container
//     var commentsContainer = [];

//     for (var i = 0; i < rowData.answers.length; i++) {
//       var answer = rowData.answers[i];
//       var answerImage;

//       if (answer.isSelected === true) {
//         answerImage = <Image style={sharedStyles.answerImage} source={require('../../../img/circle_selected.png')}/>
//       } else {
//         answerImage = <Image style={sharedStyles.answerImage} source={require('../../../img/circle_unselected.png')}/>
//       }
//       commentsContainer.push(
//         <TouchableElement underlayColor={'#cdcdcd'} key={i} onPress={() => onAnswerSelected(answer, rowData)}>
//           <View style={sharedStyles.answerCellContainer}>
//             {answerImage}
//             <Text style={sharedStyles.answerText}>{answer.title}</Text>
//           </View>
//         </TouchableElement>
//       );
//     }

//     // commentsContainer += </View)

//     // generate question view:
//     return (
//       <View style={sharedStyles.questionContainer}>
//         <Text style={sharedStyles.questionName}>{rowData.title}</Text>
//         <Text style={sharedStyles.questionText}>{rowData.desc}</Text>
//         {commentsContainer}
//       </View>
//     );
//   }

//   render() {
//     const { navigate, goBack, state } = this.props.navigation;

//     var TouchableElement = TouchableHighlight;
//     if (Platform.OS === 'android') {
//      TouchableElement = TouchableNativeFeedback;
//     }

//     return (
//       <DrawerLayout
//         drawerWidth={screenWidth()}
//         drawerPosition={DrawerLayout.positions.Right}
//         ref={'DRAWER_REF'}
//         renderNavigationView={() => drawerLayout(this, navigate, state.routeName, this.refs['DRAWER_REF']) }>
//         <View style={customStyles.container}>
//           <View style={customStyles.body}>
//             <View style={sharedStyles.blueContainer}>
//               <View style={sharedStyles.navigationBar}>
//                 <TouchableElement underlayColor={'#cdcdcd'} onPress={() => goBack()}>
//                   <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_arrow_back.png')}></Image>
//                 </TouchableElement>
//                 <View style={sharedStyles.navigationSeparator}>
//                   <Text style={sharedStyles.navigationHeadertext}>AD8</Text>
//                 </View>
//                 <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
//                   <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
//                 </TouchableElement>
//               </View>
//             </View>
//             <ScrollView style={sharedStyles.testContainer}>

//               <ListView
//                 renderHeader={this.renderHeader.bind(this)}
//                 dataSource={this.state.dataSource}
//                 renderRow={this.renderRow.bind(this)} />

//               <TouchableElement underlayColor={'#cdcdcd'} onPress={() => navigate('PatientTest', {startTestFrom: 1, startTestTo: 3, testCode: 'ad8',}) }>
//                 <View style={sharedStyles.nextButtonContainer}>
//                   <Image style={sharedStyles.nextTestButton} source={require('../../../img/next_test_button.png')}/>
//                 </View>
//               </TouchableElement>
//             </ScrollView>
//           </View>
//         </View>
//       </DrawerLayout>
//     );
//   }
// }

// const customStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgb(255, 255, 255)',
//   },
//   body: {
//     flex: 1,
//   },
//   footer: {
//     backgroundColor: 'rgb(255, 255, 255)',
//     alignItems: 'center',
//     padding: 10
//   },
// });

// module.exports = Ad8Step1Screen;