import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text

} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SplashScreen from './app/SplashScreen';
import LoginScreen from './app/LoginScreen';
import HomeScreen from './app/HomeScreen';
import CreateAccountScreen from './app/CreateAccountScreen';
import ActivePatientsScreen from './app/ActivePatientsScreen';
import AddPatientScreen from './app/AddPatientScreen';
import PatientInfoScreen from './app/PatientInfoScreen';
import SubmitScoreScreen from './app/SubmitScoreScreen';
import AddCommentScreen from './app/AddCommentScreen';
import ForgotPasswordScreen from './app/ForgotPasswordScreen';

// Scope 2
import ScreeningHomeScreen from './app/screens/screening/ScreeningHomeScreen';
import ScreeningPassScreen from './app/screens/screening/ScreeningPassScreen';
import ScreeningRedFlag1Screen from './app/screens/screening/ScreeningRedFlag1Screen';
import ScreeningRedFlag2Screen from './app/screens/screening/ScreeningRedFlag2Screen';
import ScreeningStep1Screen from './app/screens/screening/ScreeningStep1Screen';
import ScreeningStep2Screen from './app/screens/screening/ScreeningStep2Screen';
import ScreeningStep3Screen from './app/screens/screening/ScreeningStep3Screen';
import TreatingHomeScreen from './app/screens/treating/TreatingHomeScreen';
import TreatingStep1Screen from './app/screens/treating/TreatingStep1Screen';
import TreatingStep2Screen from './app/screens/treating/TreatingStep2Screen';
import TreatingStep3Screen from './app/screens/treating/TreatingStep3Screen';
import TreatingStep4Screen from './app/screens/treating/TreatingStep4Screen';
import DiagnosisHomeScreen from './app/screens/diagnosis/DiagnosisHomeScreen';
import DiagnosisNormalScreen from './app/screens/diagnosis/DiagnosisNormalScreen';
import DiagnosisRed1Screen from './app/screens/diagnosis/DiagnosisRed1Screen';
import DiagnosisRed2Screen from './app/screens/diagnosis/DiagnosisRed2Screen';
import DiagnosisStep1Screen from './app/screens/diagnosis/DiagnosisStep1Screen';
import TestResultsScreen from './app/screens/ad8/TestResultsScreen';
import MinicogResultsScreen from './app/screens/minicog/MinicogResultsScreen';
import PatientTestScreen from './app/screens/ad8/PatientTestScreen';
import MinicogStep1Screen from './app/screens/minicog/MinicogStep1Screen';
import MinicogStep2Screen from './app/screens/minicog/MinicogStep2Screen';
import MinicogStep3Screen from './app/screens/minicog/MinicogStep3Screen';
import MinicogStep4Screen from './app/screens/minicog/MinicogStep4Screen';
import MinicogStep5Screen from './app/screens/minicog/MinicogStep5Screen';

const ChampionsForHealthApp = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  CreateAccount: { screen: CreateAccountScreen },
  Home: { screen: HomeScreen },
  ActivePatients: { screen: ActivePatientsScreen },
  AddPatient: { screen: AddPatientScreen },
  PatientInfo: { screen: PatientInfoScreen },
  SubmitScore: { screen: SubmitScoreScreen },
  AddComment: { screen: AddCommentScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },

  ScreeningHome: { screen: ScreeningHomeScreen },
  ScreeningPass: { screen: ScreeningPassScreen },
  ScreeningRedFlag1: { screen: ScreeningRedFlag1Screen },
  ScreeningRedFlag2: { screen: ScreeningRedFlag2Screen },
  ScreeningStep1: { screen: ScreeningStep1Screen },
  ScreeningStep2: { screen: ScreeningStep2Screen },
  ScreeningStep3: { screen: ScreeningStep3Screen },

  TreatingHome: { screen: TreatingHomeScreen },
  TreatingStep1: { screen: TreatingStep1Screen },
  TreatingStep2: { screen: TreatingStep2Screen },
  TreatingStep3: { screen: TreatingStep3Screen },
  TreatingStep4: { screen: TreatingStep4Screen },

  DiagnosisHome: { screen: DiagnosisHomeScreen },
  DiagnosisNormal: { screen: DiagnosisNormalScreen },
  DiagnosisRed1: { screen: DiagnosisRed1Screen },
  DiagnosisRed2: { screen: DiagnosisRed2Screen },
  DiagnosisStep1: { screen: DiagnosisStep1Screen },

  MinicogStep1: { screen: MinicogStep1Screen },
  MinicogStep2: { screen: MinicogStep2Screen },
  MinicogStep3: { screen: MinicogStep3Screen },
  MinicogStep4: { screen: MinicogStep4Screen },
  MinicogStep5: { screen: MinicogStep5Screen },

  TestResults: { screen: TestResultsScreen },
  MinicogResults: { screen: MinicogResultsScreen },
  PatientTest: { screen: PatientTestScreen},
}, {
  headerMode: 'screen'
});

AppRegistry.registerComponent('ChampionsForHealth', () => ChampionsForHealthApp);
