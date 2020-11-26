import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Alert,
  AsyncStorage,
} from 'react-native';

import sharedStyles from '../Styles';
import AppConstants from '../AppConstants';
import realm from '../Models';

const deletePatientOnServer = function(id, _this, callback) {
  AsyncStorage.getItem('@appDataStore:sessionToken').then((value) => {
    if (value !== null){
      fetch(AppConstants.hostName + '/api/v1/patients/' + id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: value })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (
            responseJson != null && responseJson != undefined &&
            responseJson.status == 1
          ) {
            var patient = realm.objects('Patient').filtered('id == "' + id +'"')[0];
            if (patient) {
              realm.write(() => {
                realm.delete(patient);
              });
              callback()
            }
          } else {
            Alert.alert('Error #591', 'Failed to delete a patient. Please try again', [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
          }
          return true;
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error #592', 'Failed to delete a patient. Please try again', [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ], { cancelable: false });
        });
      }
    });
}

export function deletePatient(rowData, _this, callback) {
  Alert.alert('', 'Do you want to delete this active patient profile?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => {
        if (rowData.patientId) {
          var patientId = rowData.patientId
          deletePatientOnServer(patientId, _this, callback)
        }
      }},
    ], { cancelable: false });
}

export function sendEmail(patientId, email, callback) {

  AsyncStorage.getItem('@appDataStore:sessionToken').then((value) => {
    if (value !== null){
      fetch(AppConstants.hostName + '/api/v1/emails/' + patientId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: value, patientId: value, email: email })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (
          responseJson != null && responseJson != undefined &&
          responseJson.status == 1
        ) {
            callback()
        } else {
          Alert.alert('Error', 'Failed to send an email. Please try again', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ], { cancelable: false });
        }
        return true;
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to send an email. Please try again', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ], { cancelable: false });
      });
    }
  });
}
