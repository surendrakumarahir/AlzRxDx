import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';

import sharedStyles from '../Styles';

var deepCopy = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var ad8AnswersArray = [
  {
    position: 0,
    title: "Yes, a change",
    points: 1,
    isSelected: false,
  }, {
    position: 1,
    title: "No",
    points: 0,
    isSelected: false,
  }, {
    position: 2,
    title: "N/A, don’t know",
    points: 0,
    isSelected: false,
  },
];
var iqcodeAnswersArray = [
  {
    position: 0,
    title: "Much improved",
    points: 1,
    isSelected: false,
  }, {
    position: 1,
    title: "A bit improved",
    points: 2,
    isSelected: false,
  }, {
    position: 2,
    title: "Not much change",
    points: 3,
    isSelected: false,
  }, {
    position: 2,
    title: "A bit worse",
    points: 4,
    isSelected: false,
  }, {
    position: 2,
    title: "Much worse",
    points: 5,
    isSelected: false,
  },
]
var phq9AnswersArray = [
  {
    position: 0,
    title: "Not at all",
    points: 0,
    isSelected: false,
  }, {
    position: 1,
    title: "Several days",
    points: 1,
    isSelected: false,
  }, {
    position: 2,
    title: "More then half the days",
    points: 2,
    isSelected: false,
  }, {
    position: 3,
    title: "Nearly every day",
    points: 3,
    isSelected: false,
  },
]

var ad8 = {
  name: "Dementia Screening Interview",
  topTitle: "8 Questions:",
  questionsPerPage: 2,
  code: "ad8",
  screenTitle: 'AD8',
  screenName: 'Ad8Step1',
  // lastScreenName: 'Ad8Results',
  // lastScreenName: 'IqcodeResults',
  scoreComment: "Total AD8 Score",
  pointsContainer: function(testPoints1, testPoints2) {
    return (<Text style={sharedStyles.scoresDescription}>
      <Text>Points are added up for each question.{"\n\n"}</Text>
      <Text>Yes = </Text><Text style={{fontWeight: "bold"}}>1 point{"\n"}</Text>
      <Text>No or N/A = </Text><Text style={{fontWeight: "bold"}}>0 points{"\n\n"}</Text>
      <Text>
        A score of greater or equal to 2 is likely
        cognitive impairment. A score of less than 2 is
        considered normal.
      </Text>
    </Text>)
  },

  desc: "The AD8 can be used as either a patient or informant screening tool.\n\n" +
    "“Yes, a change” indicates that there has been a change noted in the last several years caused by cognitive (thinking and memory) problems.",
  questions: [
    {
      position: 0,
      title: "Question 1:",
      desc: "Problems with judgment (e.g., problems making decisions, bad financial decisions, problems with thinking)",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 1,
      title: "Question 2:",
      desc: "Less interest in hobbies/activities",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 2,
      title: "Question 3:",
      desc: "Repeats the same things over and\nover (questions, stories, or statements)",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 3,
      title: "Question 4:",
      desc: "Trouble learning how to use a tool,\nappliance, or gadget (e.g., VCR, computer,\nmicrowave, remote control)",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 4,
      title: "Question 5:",
      desc: "Forgets correct month or year",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 6,
      title: "Question 6:",
      desc: "Trouble handling complicated financial\naffairs (e.g., balancing checkbook, income taxes, paying bills)",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 6,
      title: "Question 7:",
      desc: "Trouble remembering appointments",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    }, {
      position: 7,
      title: "Question 8:",
      desc: "Daily problems with thinking and/or memory",
      type: 1,
      answers: deepCopy(ad8AnswersArray),
    },
  ]
}


var iqcode = {
  name: "IQCODE Short Form",
  topTitle: '16 Questions:',
  questionsPerPage: 2,
  code: "iqcode",
  screenTitle: 'IQCODE',
  // screenName: 'Ad8Step1',
  // lastScreenName: 'Ad8Results',
  // lastScreenName: 'IqcodeResults',
  scoreComment: "Total Short IQCODE Score",
  pointsContainer: function(testPoints1, testPoints2) {
    return (<Text style={sharedStyles.scoresDescription}>
      <Text>Points are added up for each question and divided by 16 (16 questions).{"\n\n"}</Text>
      <Text>Much improved = </Text><Text style={{fontWeight: "bold"}}>1 point{"\n"}</Text>
      <Text>A bit improved = </Text><Text style={{fontWeight: "bold"}}>2 points{"\n"}</Text>
      <Text>Not much change = </Text><Text style={{fontWeight: "bold"}}>3 points{"\n"}</Text>
      <Text>A bit worse = </Text><Text style={{fontWeight: "bold"}}>4 points{"\n"}</Text>
      <Text>Much worse = </Text><Text style={{fontWeight: "bold"}}>5 points{"\n\n"}</Text>
      <Text>
        An average score of 3 means that the subject is rated on average as ‘no change’. A score of 4 means an average of ‘a bit worse’. A score of 5 an average of ‘much worse’.
      </Text>
    </Text>);
  },
  desc: "The IQCODE should be used as an informant evaluation instrument.\n\n"+
    "Compared with 10 years ago how is this person at:",
  questions: [
    {
      position: 0,
      title: "Question 1:",
      desc: "Remembering things about family and friends (e.g. occupations, birthdays, addresses)?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 1,
      title: "Question 2:",
      desc: "Remembering things that have happened recently?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 2,
      title: "Question 3:",
      desc: "Recalling conversations a few days later?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 3,
      title: "Question 4:",
      desc: "Remembering his/her address and telephone number?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 4,
      title: "Question 5:",
      desc: "Remembering what day and month it is?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 5,
      title: "Question 6:",
      desc: "Remembering where things are usually kept?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 6,
      title: "Question 7:",
      desc: "Remembering where to find things which have been put in a different place from usual?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 7,
      title: "Question 8:",
      desc: "Knowing how to work familiar machines around the house?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 8,
      title: "Question 9:",
      desc: "Learning to use a new gadget or machine around the house?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 9,
      title: "Question 10:",
      desc: "Learning new things in general?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 10,
      title: "Question 11:",
      desc: "Following a story in a book or on TV?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 11,
      title: "Question 12:",
      desc: "Making decisions on everyday matters?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    }, {
      position: 12,
      title: "Question 13:",
      desc: "Handling money for shopping?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    },  {
      position: 13,
      title: "Question 14:",
      desc: "Handling financial matters (e.g. the pension, dealing with the bank)?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    },  {
      position: 14,
      title: "Question 15:",
      desc: "Handling other everyday arithmetic problems (e.g. knowing how much food to buy, knowing how long between visits from family or friends)?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    },  {
      position: 15,
      title: "Question 16:",
      desc: "Using his/her intelligence to understand what's going on and to reason things through?",
      type: 1,
      answers: deepCopy(iqcodeAnswersArray),
    },
  ]
}

var phq9 = {
  name: "Patient Health Questionnaire",
  topTitle: '9 Questions:',
  questionsPerPage: 2,
  code: "phq9",
  screenTitle: 'PHQ9',
  // screenName: 'Ad8Step1',
  // lastScreenName: 'Ad8Results',
  // lastScreenName: 'IqcodeResults',
  scoreComment: "Total PHQ-9 Score",
  pointsContainer: function(testPoints1, testPoints2) {
    return (<Text style={sharedStyles.scoresDescription}>
      <Text>Points are added up for each question.{"\n\n"}</Text>
      <Text>Not at all = </Text><Text style={{fontWeight: "bold"}}>0 points{"\n"}</Text>
      <Text>Several days  = </Text><Text style={{fontWeight: "bold"}}>1 point{"\n"}</Text>
      <Text>More than half the days = </Text><Text style={{fontWeight: "bold"}}>2 points{"\n"}</Text>
      <Text>Nearly everyday = </Text><Text style={{fontWeight: "bold"}}>3 points{"\n\n"}</Text>
      <Text>Minimal depression = </Text><Text style={{fontWeight: "bold"}}>1-4{"\n"}</Text>
      <Text>Mild depression = </Text><Text style={{fontWeight: "bold"}}>5-9{"\n"}</Text>
      <Text>Moderate depression = </Text><Text style={{fontWeight: "bold"}}>10-14{"\n"}</Text>
      <Text>Moderately severe depression = </Text><Text style={{fontWeight: "bold"}}>15-19{"\n"}</Text>
      <Text>Severe depression = </Text><Text style={{fontWeight: "bold"}}>20-27{"\n"}</Text>
    </Text>)
  },

  desc: "The PHQ-9 instrument is used to assess depression. For initial screening, may use first two questions.\n\n"+
    "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
  questions: [
    {
      position: 0,
      title: "Question 1:",
      desc: "Little interest or pleasure in doing things",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 1,
      title: "Question 2:",
      desc: "Feeling down, depressed, or helpless",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 2,
      title: "Question 3:",
      desc: "Trouble falling or staying asleep, or sleeping too much",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 3,
      title: "Question 4:",
      desc: "Feeling tired or having little energy",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 4,
      title: "Question 5:",
      desc: "Poor appetite or overeating",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 5,
      title: "Question 6:",
      desc: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 6,
      title: "Question 7:",
      desc: "Trouble concentrating on things, such as reading the newspaper or watching television",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 7,
      title: "Question 8:",
      desc: "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    }, {
      position: 8,
      title: "Question 9:",
      desc: "Thoughts that you would be better off dead, or of hurting yourself",
      type: 1,
      answers: deepCopy(phq9AnswersArray),
    },
  ]
}

var qdrs = {
  name: "Quick Dementia\nRating System (QDRS)",
  topTitle: '',
  questionsPerPage: 1,
  code: "qdrs",
  screenTitle: 'QDRS',
  // screenName: 'Ad8Step1',
  // lastScreenName: 'Ad8Results',
  // lastScreenName: 'IqcodeResults',
  scoreComment: "Total QDRS Score",
  pointsContainer: function(testPoints1, testPoints2) {
    return (<View>
      <Text style={sharedStyles.scoresDescription}>
        <Text>Points are added up for each question.{"\n\n"}</Text>
        <Text>Response 1 = </Text><Text style={{fontWeight: "bold"}}>0 points{"\n"}</Text>
        <Text>Response 2 = </Text><Text style={{fontWeight: "bold"}}>0.5 points{"\n"}</Text>
        <Text>Response 3 = </Text><Text style={{fontWeight: "bold"}}>1 point{"\n"}</Text>
        <Text>Response 4 = </Text><Text style={{fontWeight: "bold"}}>2 points{"\n"}</Text>
        <Text>Response 5 = </Text><Text style={{fontWeight: "bold"}}>3 points{"\n\n"}</Text>
        <Text>A total score of ≥ 2 suggests a problem causing limitations or issues, and may need a detailed workup.</Text>
      </Text>
      <View style={sharedStyles.doubleTestContainer}>
        <View style={sharedStyles.doubleTextDescriptionContainer}>
          <Text style={sharedStyles.doubleTextDescription}>
            <Text style={{fontWeight: "bold"}}>Cognitive Quiestions Subtotal:{"\n"}</Text>
            <Text>(Questions 1,2,3,8)</Text>
          </Text>
        </View>
        <Text style={sharedStyles.doubleTestValue}>{testPoints1}</Text>
      </View>
      <View style={sharedStyles.doubleTestContainer}>
        <View style={sharedStyles.doubleTextDescriptionContainer}>
          <Text style={sharedStyles.doubleTextDescription}>
            <Text style={{fontWeight: "bold"}}>Behavioral Quiestions Subtotal:{"\n"}</Text>
            <Text>(Questions 4,5,6,7,9,10)</Text>
          </Text>
        </View>
        <Text style={sharedStyles.doubleTestValue}>{testPoints2}</Text>
      </View>
    </View>);
  },

  desc: "The QDRS should be used as an informant evaluation instrument.",
  questions: [
    {
      position: 0,
      title: "1 (C):",
      type: 1,
      desc: "Memory and recall",
      answers: [
        {
          position: 0,
          title: "No obvious memory loss or inconsistent forgetfulness",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Consistent mild forgetfulness or partial recollection of events",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Mild to moderate memory loss",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Moderate to severe memory loss",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Severe memory loss",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 1,
      title: "2 (C):",
      type: 1,
      desc: "Orientation",
      answers: [
        {
          position: 0,
          title: "Fully oriented to person, place, and time",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Slight difficulty in keeping track of time",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Mild to moderate difficulty in keeping track of time and sequence of events",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Moderate to severe difficulty, usually disoriented to time and place ",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Only oriented to their name, although may recognize family members",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 2,
      title: "3 (C):",
      type: 1,
      desc: "Decision making and problem-solving abilities",
      answers: [
        {
          position: 0,
          title: "Solves everyday problems without difficulty",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Slight impairment or takes longer to solve problems",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Moderate difficulty with handling problems and making decisions",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Severely impaired in handling problems, makes only simple personal decisions; social judgment often impaired",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Unable to make decisions or solve problems ",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 3,
      title: "4 (B):",
      type: 2,
      desc: "Activities outside the home",
      answers: [
        {
          position: 0,
          title: "Independent in function at the usual level of performance",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Slight impairment in these activities compared with previous performance",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Unable to function independently but still may attend and be engaged; appears “normal” to others",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "No pretense of independent function outside the home",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "No independent function or activities; appear too ill to be taken to activities outside the home",
          points: 3,
          isSelected: false,
        },
      ],
    },  {
      position: 4,
      title: "5 (B):",
      type: 2,
      desc: "Function at home and hobby activities",
      answers: [
        {
          position: 0,
          title: "Chores at home, hobbies and personal interests are well maintained",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Slight impairment or less interest in these activities; trouble operating appliances",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Mild but definite impairment in home and hobby function",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Only simple chores preserved, very restricted interest in hobbies",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "No meaningful function in household chores or with prior hobbies",
          points: 3,
          isSelected: false,
        },
      ],
    },  {
      position: 5,
      title: "6 (B):",
      type: 2,
      desc: "Toileting and personal hygiene",
      answers: [
        {
          position: 0,
          title: "Fully capable of self-care ",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Slight changes in abilities and attention to these activities",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Needs prompting to complete these activities",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Requires some assistance in dressing, hygiene, keeping of personal items; occasionally incontinent",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Requires significant help with personal care and hygiene",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 6,
      title: "7 (B):",
      type: 2,
      desc: "Behavior and personality changes",
      answers: [
        {
          position: 0,
          title: "Socially appropriate behavior in public and private",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Questionable or very mild changes in behavior, personality, appropriateness of choices",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Mild changes in behavior or personality",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Moderate behavior or personality changes, affects interactions with others",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Severe behavior or personality changes; interactions with others often unpleasant or avoided",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 7,
      title: "8 (C):",
      type: 1,
      desc: "Language",
      answers: [
        {
          position: 0,
          title: "No language difficulty or occasional word searching",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Consistent mild word finding difficulties, using descriptive terms or takes longer to get point across, mild problems with comprehension, decreased conversation",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Moderate word finding difficulty in speech, cannot name objects, marked reduction in work, comprehension,  conversation, writing, and/or reading",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Moderate to severe impairments in speech production or comprehension",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Severe deficits in language and communication ",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 8,
      title: "9 (B):",
      type: 2,
      desc: "Mood",
      answers: [
        {
          position: 0,
          title: "No changes in mood, interest, or motivation level",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Occasional sadness, depression, anxiety, nervousness, or loss of interest/motivation",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Daily mild issues with above",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Moderate issues with above",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Severe issues with above",
          points: 3,
          isSelected: false,
        },
      ],
    }, {
      position: 9,
      title: "10 (B):",
      type: 2,
      desc: "Attention and concentration",
      answers: [
        {
          position: 0,
          title: "Normal attention, concentration, and interaction with environment and surroundings",
          points: 0,
          isSelected: false,
        }, {
          position: 1,
          title: "Mild problems with attention, concentration, and interaction with environment and surroundings, may appear drowsy during day",
          points: 0.5,
          isSelected: false,
        }, {
          position: 2,
          title: "Moderate problems, may have staring spells or spend time with eyes closed, increased daytime sleepiness",
          points: 1,
          isSelected: false,
        }, {
          position: 3,
          title: "Significant portion of the day is spent sleeping, not paying attention to environment, may say things that are illogical or not consistent with topic",
          points: 2,
          isSelected: false,
        }, {
          position: 4,
          title: "Limited to no ability to pay attention to external environment or surroundings",
          points: 3,
          isSelected: false,
        },
      ],
    },
  ]
}

export function PatientTests() {
  return {
  'ad8': ad8,
  'iqcode': iqcode,
  'phq9': phq9,
  'qdrs': qdrs,
  }
}