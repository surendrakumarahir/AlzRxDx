'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions,
  Platform,
} = React;
import AppConstants from './AppConstants';

const { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({
  button: {
    width: width * 0.847,
    height: (Platform.OS === 'ios') ? height * 0.075 : height * 0.073,
  },
  treeImage: {
    flex: 1,
    resizeMode: 'stretch',
    height: (Platform.OS === 'ios') ? height * 0.6 : height * 0.6,
  },
  treeImageContainer: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: (Platform.OS === 'ios') ? height * 0.07 : height * 0.07,
  },
  infoContainerFooter: {
    height: 90,
  },
  infoHeaderGreen: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorTextGreen,
    fontSize: (Platform.OS === 'ios') ? 21 : 17,
  },
  infoHeaderYellow: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorYellow,
    fontSize: (Platform.OS === 'ios') ? 21 : 17,
  },
  infoHeaderBlue: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorBlue,
    fontSize: (Platform.OS === 'ios') ? 21 : 17,
  },
  infoHeaderRed: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorRed,
    fontSize: (Platform.OS === 'ios') ? 21 : 17,
  },
  infoText: {
    marginTop: (Platform.OS === 'ios') ? height * 0.02 : height * 0.02,
    fontFamily: AppConstants.fontRegular,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    lineHeight: (Platform.OS === 'ios') ? 23 : 20,
  },
  homeScreenFooter: {
    height: 90,
    alignItems: 'center'
  },
  buttonContainer: {
    alignItems: 'center'
  },
  homeScreenTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeScreenMainTitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurple,
    fontSize: 28,
  },
  homeScreenSubtitle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    marginTop: 10,
  },
  lightPurpleBackground: {
    backgroundColor: AppConstants.colorPurpleLight,
  },
  buttonBackground: {
    backgroundColor: AppConstants.colorPurple,
    alignSelf: 'stretch',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    fontFamily: AppConstants.fontRegular,
  },
  pieChart: {
    position: 'absolute',
    left: 0,
  },
  activePatientsTextContainer: {
    // marginBottom: 50,
    // marginTop: 50,
    height: (Platform.OS === 'ios') ? height * 0.25 : height * 0.24,
    width: (Platform.OS === 'ios') ? height * 0.25 : height * 0.24,
    marginTop: 10,
    marginBottom: 30,
    // backgroundColor: 'white',
  },
  pieChartText: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: (Platform.OS === 'ios') ? height * 0.05 : height * 0.03,
    // fontFamily: AppConstants.fontRegular,
    // fontSize: (Platform.OS === 'ios') ? 14 : 12,
  },

  blueContainer: {
    backgroundColor: AppConstants.colorPurple,
    alignItems: 'center',
  },
  whiteContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  transparentContainer: {
    alignItems: 'center',
  },
  addAccountImage: {
    width: (Platform.OS === 'ios') ? width * 0.4 : width * 0.4,
    height: (Platform.OS === 'ios') ? height * 0.23 : height * 0.2,
    marginBottom: 40,
    marginTop: 10,
    marginLeft: 35,
    resizeMode: 'contain',
  },

  textFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    width: width * 0.847,
    paddingTop:  (Platform.OS === 'ios') ? width * 0.041 : width * 0,
    paddingBottom:  (Platform.OS === 'ios') ? width * 0.041 : width * 0,
    paddingLeft:  (Platform.OS === 'ios') ? width * 0.041 : width * 0.04,
    paddingRight:  (Platform.OS === 'ios') ? width * 0.041 : width * 0.04,
    backgroundColor: '#fff',
  },
  textFieldContainerWithBorder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingTop:  (Platform.OS === 'ios') ? width * 0.041 : width * 0,
    paddingLeft:  (Platform.OS === 'ios') ? width * 0.041 : width * 0.04,
    paddingRight:  (Platform.OS === 'ios') ? width * 0.041 : width * 0.04,
    paddingBottom:  (Platform.OS === 'ios') ? width * 0.02 : width * 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#d6d7da',
  },
  textFieldIcon: {
      width: (Platform.OS === 'ios') ? width * 0.05 : width * 0.04,
      height: (Platform.OS === 'ios') ? width * 0.05 : width * 0.04,
      resizeMode: 'contain',
  },
  textFieldStyle: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: '#fff',
      color: '#424242',
      fontSize: 13,
  },
  navigationBarClear: {
    marginTop: (Platform.OS === 'ios') ? width * 0.02 : width * 0.01,
    paddingTop: (Platform.OS === 'ios') ? width * 0.02 : width * 0.01,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection:'row',
    marginBottom: (Platform.OS === 'ios') ? height * 0.02 : height * 0.02,
  },
  navigationBar: {
    marginTop: (Platform.OS === 'ios') ? width * 0.02 : width * 0.01,
    paddingTop: (Platform.OS === 'ios') ? width * 0.02 : width * 0.01,
    backgroundColor: AppConstants.colorPurple,
    flexDirection:'row',
    marginBottom: (Platform.OS === 'ios') ? height * 0.02 : height * 0.02,
  },
  navigationBarLeftButton: {
    width: 25,
    height: 25,
    margin: 10,
    resizeMode: 'contain',
  },

  downArrowIcon: {
    width: 25,
    height: 25,
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  navigationBarRightButton: {
    width: 25,
    height: 25,
    margin: 10,
  },
  navigationSeparator: {
    flex: 1,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  navigationHeadertextGray: {
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 16 : 14,
    marginTop: 5,
    fontFamily: AppConstants.fontLight,
  },
  navigationHeadertext: {
    color: 'white',
    fontSize: (Platform.OS === 'ios') ? 16 : 14,
    marginTop: 5,
    fontFamily: AppConstants.fontLight,
  },
  graphTextBig: {
    fontFamily: AppConstants.fontRegular,
    fontSize: 34,
    color: 'white',
    textAlign: 'center'
  },
  graphTextSmall: {
    fontSize: (Platform.OS === 'ios') ? 13 : 12,
    marginTop: 1,
    fontFamily: AppConstants.fontTitle,
    color: 'white',
    textAlign: 'center',
  },
  navigationButtonText: {
    fontSize: 32,
  },
  answerCellContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  answerImage: {
    height: 22,
    width: 22,
    marginRight: 10,
  },
  questionContainer: {
    margin: 20
  },
  questionName: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurpleLight,
    fontSize: 20,
    marginBottom: 10,
  },
  questionText: {
    fontFamily: AppConstants.fontBold,
    color: 'black',
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answerText: {
    fontFamily: AppConstants.fontRegular,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
  },
  patientTestContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  patientTestTopTitle: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurpleLight,
    fontSize: 20,
    marginTop: 40,
  },
  patientTestTitle: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurple,
    fontSize: 20,
    marginBottom: 10,
  },
  patientTestDescription: {
    fontFamily: AppConstants.fontRegular,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    marginBottom: 10,
  },
  testContainer: {
    flex: 1,
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
    marginLeft: 20,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  nextButtonContainerNoPadding: {
    alignItems: 'flex-end',
    marginLeft: 20,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  nextTestButton: {
    width: 50,
    height: 50,
  },
  patientTestReviewScoreContainer: {
    marginBottom: 30,
    // marginLeft: 20,
    // marginRight: 20,
    marginTop: 30,
  },
  patientTestListView: {
    marginLeft: 20,
    marginRight: 20,
  },
  scoresContainer: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  scoresTitle: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorPurple,
    fontSize: 20,
    marginBottom: 20,
  },
  scoresDescription: {
    fontFamily: AppConstants.fontRegular,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
    marginBottom: 10,
  },
  scoreText: {
    fontFamily: AppConstants.fontTitle,
    color: AppConstants.colorTextGreen,
    fontSize: 70,
    marginBottom: 0,
    marginTop: 20,
  },
  scoreComment: {
    fontFamily: AppConstants.fontBold,
    fontWeight: "bold",
    color: 'black',
    fontSize: 16,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreButtonsContainer: {
    marginBottom: 10,
  },
  doubleTestContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  doubleTextDescriptionContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  doubleTextDescription: {
    fontFamily: AppConstants.fontRegular,
    color: AppConstants.colorTextLight,
    fontSize: (Platform.OS === 'ios') ? 14 : 12,
  },
  doubleTestValue: {
    fontFamily: AppConstants.fontBold,
    fontWeight: "bold",
    color: AppConstants.colorTextGreen,
    fontSize: 18,
    marginRight: 70,
  },
  minicogMainContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  marginTop20: {
    marginTop: (Platform.OS === 'ios') ? height * 0.02 : height * 0.02,
  },
  paddingRight10: {
    paddingRight: (Platform.OS === 'ios') ? height * 0.05 : height * 0.05,
  },
  marginBottom30: {
    marginBottom: (Platform.OS === 'ios') ? height * 0.03 : height * 0.03,
  },
  marginBottom20: {
    marginBottom: (Platform.OS === 'ios') ? height * 0.02 : height * 0.02,
  },
  marginBottom40: {
    marginBottom: (Platform.OS === 'ios') ? height * 0.04 : height * 0.04,
  },
  marginBottom640: {
    marginBottom: (Platform.OS === 'ios') ? height * 0.02 : height * 0.1,
  },

  marginBottom100: {
    marginBottom: (Platform.OS === 'ios') ? height * 0.1 : height * 0.1,
  },
  marginBottom10: {
    marginBottom: (Platform.OS === 'ios') ? height * 0.01 : height * 0.01,
  },
  marginTop5: {
    marginTop: (Platform.OS === 'ios') ? height * 0.005 : height * 0.005,
  },
  centeredListView: {
     flex: 1,
     justifyContent: 'center',
   },
});