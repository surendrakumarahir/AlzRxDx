import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage,
} from 'react-native';
import realm from './Models';
import AppConstants from './AppConstants';

export function uploadResult(result, callback) {
  // upload
  // upload to server
  AsyncStorage.getItem('@appDataStore:sessionToken').then((value) => {
    if (value !== null){
      var url, method;
      if (!result.saved) {
        method = 'POST';
        url = AppConstants.hostName + '/api/v1/results';
      } else {
        method = 'PUT';
        url = AppConstants.hostName + '/api/v1/results/' + result.id;
      }

      fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: value,
          result: {
            patient_id: result.patientId,
            test_id: result.testId,
            test_code: result.testCode,
            score1: result.score1,
            score2: result.score2,
            score_total: result.scoreTotal,
            words_list_version: result.wordsListVersion,
            comment: result.comment,
            date: result.date,
          }
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (
          responseJson != null && responseJson != undefined &&
          responseJson.result != null && responseJson.result != undefined
        ) {
          var resultId = responseJson.result.id;
          // save result id
          realm.write(() => {
            result.id = resultId;
            result.saved = true;
          });
          return callback(null);
        } else {
          return callback({title: 'Error #12', message: 'Failed to save test result. Please try again'});
        }
        return true;
      })
      .catch((error) => {
        console.log("ERR");
        console.log(error);

        return callback({title: 'Error #11', message: 'Failed to save test result. Please try again'});
      });
    }
  }).done();
}
exports.colorPurple = 'rgb(98, 46, 145)';
exports.colorPurpleLight = 'rgb(151,104,225)';
exports.colorTextLight = 'rgb(40,40,40)';

exports.fontLight = 'Avenir-Light';
exports.fontRegular = 'Avenir-Book';