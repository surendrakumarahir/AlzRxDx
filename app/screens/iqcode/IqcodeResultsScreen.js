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

// class IqcodeResultsScreen extends Component {
//   constructor() {
//     super();

//     var _this = this;
//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       dataSource: ds.cloneWithRows([]),
//     };
//   }

//   static navigationOptions = {
//     title: 'Screening Home Screen',
//     header: null,
//   };

//   componentWillMount() {
//     const { navigate, goBack, state } = this.props.navigation;
//     if (state != null && state != undefined && state.params != null && state.params != undefined) {
//       var params = state.params
//       if (params.testPoints != null && params.testPoints != undefined) {
//         var testPoints = params.testPoints;
//         this.setState({testPoints: testPoints});
//       }
//     }
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
//                   <Text style={sharedStyles.navigationHeadertext}>Active Patients</Text>
//                 </View>
//                 <TouchableElement underlayColor={'#cdcdcd'} onPress={() => openDrawer(this.refs['DRAWER_REF']) }>
//                   <Image style={sharedStyles.navigationBarLeftButton} source={require('../../../img/icon_hamburger.png')}></Image>
//                 </TouchableElement>
//               </View>
//             </View>
//             <View style={sharedStyles.scoresContainer}>
//               <Text style={sharedStyles.scoresTitle}>Scoring</Text>
//               <Text style={sharedStyles.scoresDescription}>
//                 <Text>Points are added up for each question.{"\n\n"}</Text>
//                 <Text>Yes = </Text><Text style={{fontWeight: "bold"}}>1 point{"\n"}</Text>
//                 <Text>No or N/A = </Text><Text style={{fontWeight: "bold"}}>0 points{"\n\n"}</Text>
//                 <Text>
//                   A score of greater or equal to 2 is likely
//                   cognitive impairment. A score of less than 2 is
//                   considered normal.
//                 </Text>
//               </Text>
//               <View style={sharedStyles.centeredView}>
//                 <Text style={sharedStyles.scoreText}>{this.state.testPoints}</Text>
//                 <Text style={sharedStyles.scoreComment}>Total AD8 Score</Text>
//               </View>
//             </View>
//             <View style={sharedStyles.scoreButtonsContainer}>
//               <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.addCommentButton]} onPress={() => navigateNext(navigate, this.state)}>
//                   <View style={[sharedStyles.buttonBackground, sharedStyles.lightPurpleBackground]}>
//                     <Text style={sharedStyles.buttonText}>Add Comments</Text>
//                   </View>
//               </TouchableElement>
//               <TouchableElement underlayColor={'#cdcdcd'} style={[sharedStyles.button, customStyles.submitScoreButton]} onPress={() => navigateNext(navigate, this.state)}>
//                   <View style={[sharedStyles.buttonBackground, customStyles.submitScoreButton]}>
//                     <Text style={sharedStyles.buttonText}>Submit Test Score</Text>
//                   </View>
//               </TouchableElement>
//             </View>
//           </View>
//         </View>
//       </DrawerLayout>
//     );
//   }
// }

// const customStyles = StyleSheet.create({
//   addCommentButton: {
//     backgroundColor: AppConstants.colorPurpleLight,
//     marginBottom: 10,
//   },
//   submitScoreButton: {
//     backgroundColor: AppConstants.colorTextGreen,
//   },
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

// module.exports = IqcodeResultsScreen;