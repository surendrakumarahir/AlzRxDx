const Realm = require('realm');
const PatientSchema = {
  name: 'Patient',
  properties: {
    id:        'string',
    number:    'string',
    name:      { type: 'string', optional: true, },
    results:   { type: 'list', objectType: 'Result' },
  }
};
const TestSchema = {
  name: 'Test',
  properties: {
    id:        'string',
    shortName: 'string',
    fullName:  'string',
    code:      'string',
    isManual:  'bool',
    position:  'int',
    results:   {type: 'list', objectType: 'Result'},
  }
};
const ResultSchema = {
  name: 'Result',
  properties: {
    id:         'string',
    patientId:  'string',
    testId:     'string',
    testCode:   'string',
    saved:        { type: 'bool', default: false },
    score1:       { type: 'float', optional: true, },
    score2:       { type: 'float', optional: true, },
    scoreTotal:   { type: 'float', optional: true, },
    wordsListVersion: { type: 'int', optional: true, },
    comment:     { type: 'string', optional: true, },
    date:        { type: 'date', default: new Date() },
    patient:     { type: 'Patient' },
    test:        { type: 'Test' },
  }
};

// Initialize a Realm with Car and Person models
const realm = new Realm({schema: [PatientSchema, TestSchema, ResultSchema]});
module.exports = realm;