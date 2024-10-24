/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
(function () {

  // BUGS:
  // - When you click save and go back into edit, it does the same thing again and creates new notes without deleting old ones
  
  const REST_STR = 'rest'

  const exampleMusicXMLJSON = {
  "score-partwise": {
    "$version": "3.1",
    "identification": {
      "creator": {
        "content": "Brittany J. Green",
        "$type": "composer"
      },
      "encoding": {
        "software": "Flat",
        "encoding-date": "2024-08-12"
      },
      "source": "https://flat.io/score/62ec0df2c6f0b1001227613f-freedom-2040-the-tomorrow-we-ll-build-melody-concert-pitch-tc?sharingKey=30bc11ca0306e5d4955a135fd0bd723010fb082fe006f4dd505c36ade58ded13f494a810a480215bfe02b41e60f6972b5e69f40b5f2772291e75ada7fd8cd0b3"
    },
    "defaults": {
      "scaling": {
        "millimeters": "7.2319",
        "tenths": "40"
      },
      "page-layout": {
        "page-height": "1545",
        "page-width": "1194",
        "page-margins": {
          "$type": "both",
          "left-margin": "70",
          "right-margin": "70",
          "top-margin": "70",
          "bottom-margin": "70"
        }
      },
      "system-layout": {
        "system-margins": {
          "left-margin": "0",
          "right-margin": "0"
        },
        "system-distance": "121",
        "top-system-distance": "70"
      },
      "appearance": {
        "line-width": [
          {
            "content": "0.7487",
            "$type": "stem"
          },
          {
            "content": "5",
            "$type": "beam"
          },
          {
            "content": "0.7487",
            "$type": "staff"
          },
          {
            "content": "0.7487",
            "$type": "light barline"
          },
          {
            "content": "5",
            "$type": "heavy barline"
          },
          {
            "content": "0.7487",
            "$type": "leger"
          },
          {
            "content": "0.7487",
            "$type": "ending"
          },
          {
            "content": "0.7487",
            "$type": "wedge"
          },
          {
            "content": "0.7487",
            "$type": "enclosure"
          },
          {
            "content": "0.7487",
            "$type": "tuplet bracket"
          }
        ],
        "note-size": [
          {
            "content": "60",
            "$type": "grace"
          },
          {
            "content": "60",
            "$type": "cue"
          }
        ],
        "distance": [
          {
            "content": "120",
            "$type": "hyphen"
          },
          {
            "content": "7.5",
            "$type": "beam"
          }
        ]
      },
      "music-font": {
        "$font-family": "Bravura"
      },
      "staff-layout": {
        "staff-distance": "70.24433413072636"
      },
      "$adagio-systemBreakPolicy": {
        "maxNbMeasuresPerLine": 4,
        "forbiddenCounts": {}
      }
    },
    "credit": [
      {
        "credit-type": "title",
        "credit-words": "Freedom 2040: The Tomorrow We'll Build Melody - Concert Pitch TC"
      }
    ],
    "part-list": {
      "score-part": [
        {
          "$id": "P1",
          "part-name": {
            "content": "Concert Pitch",
            "$print-object": "no"
          },
          "part-abbreviation": {
            "content": "Ob.",
            "$print-object": "no"
          },
          "score-instrument": {
            "$id": "P1-I1",
            "instrument-name": "SmartMusicSoftSynth",
            "instrument-sound": "wind.reed.oboe",
            "virtual-instrument": {}
          },
          "midi-device": "SmartMusicSoftSynth",
          "midi-instrument": {
            "$id": "P1-I1",
            "midi-channel": "2",
            "midi-bank": "15489",
            "midi-program": 69,
            "pan": "-56"
          },
          "uuid": "b6e5faf5-e2d7-b2ab-0eaf-f6b5b8467ca8",
          "voiceMapping": {
            "0": [
              0
            ]
          },
          "staffMapping": [
            {
              "voices": [
                0
              ],
              "mainVoiceIdx": 0,
              "staffUuid": "74e64bc4-a81b-7f02-6ea3-61645a6a7739"
            }
          ],
          "voiceIdxToUuidMapping": {
            "0": "97cd248f-79db-20ff-cb25-904a5dc735de"
          },
          "voiceUuidToIdxMapping": {
            "97cd248f-79db-20ff-cb25-904a5dc735de": 0
          }
        }
      ]
    },
    "part": [
      {
        "$id": "P1",
        "measure": [
          {
            "$number": "1",
            "$width": "178",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "5",
                  "step": "D"
                },
                "$adagio-location": {
                  "timePos": 0
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "4",
                  "step": "B",
                  "alter": "-1"
                },
                "$adagio-location": {
                  "timePos": 2
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "4",
                  "step": "B",
                  "alter": "-1"
                },
                "$adagio-location": {
                  "timePos": 4
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "5",
                  "step": "C"
                },
                "$adagio-location": {
                  "timePos": 6
                },
                "type": "quarter",
                "$color": "#E75B5C"
              }
            ],
            "attributes": [
              {
                "divisions": "2",
                "time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "clef": {
                  "sign": "G",
                  "line": "2"
                },
                "key": {
                  "fifths": "-3"
                },
                "staff-details": {
                  "staff-lines": "5"
                },
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "sound": [
              {
                "$adagio-swing": {
                  "swing": false
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                }
              },
              {
                "$tempo": "120",
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                }
              }
            ],
            "direction": [
              {
                "$placement": "above",
                "staff": "1",
                "$adagio-location": {
                  "timePos": 0
                },
                "direction-type": {
                  "metronome": {
                    "per-minute": "120",
                    "beat-unit": "quarter"
                  }
                },
                "noteBefore": -1,
                "$adagio-isFirst": true
              }
            ],
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "2",
            "$width": "44",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "4",
                  "step": "G"
                },
                "$adagio-location": {
                  "timePos": 0
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "4",
                  "step": "B",
                  "alter": "-1"
                },
                "$adagio-location": {
                  "timePos": 2
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "4",
                  "step": "B",
                  "alter": "-1"
                },
                "$adagio-location": {
                  "timePos": 4
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "rest": {},
                "voice": "1",
                "staff": "1",
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "type": "quarter",
                "$color": "#E75B5C"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "3",
            "$width": "65",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "A",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "5",
                  "step": "E",
                  "alter": "-1"
                },
                "$adagio-location": {
                  "timePos": 0
                },
                "type": "quarter",
                "$color": "#265C5C"
              },
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "4",
                  "step": "B",
                  "alter": "-1"
                },
                "$adagio-location": {
                  "timePos": 2
                },
                "type": "quarter",
                "$color": "#265C5C"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#265C5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "4",
            "$width": "44",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "staff": "1",
                "voice": "1",
                "duration": "2",
                "pitch": {
                  "octave": "5",
                  "step": "D"
                },
                "$adagio-location": {
                  "timePos": 0
                },
                "type": "quarter",
                "$color": "#E75B5C"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#E75B5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "5",
            "$width": "63",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#E75B5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "6",
            "$width": "55",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "C"
                },
                "kind": {
                  "content": "minor",
                  "$halign": "center",
                  "$text": "m"
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#265C5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "7",
            "$width": "63",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "B",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "bass": {
                  "bass-step": "D"
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#4390E2",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "8",
            "$width": "44",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#E75B5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "9",
            "$width": "62",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#E75B5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "10",
            "$width": "44",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "A",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#265C5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "11",
            "$width": "67",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "B",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#4390E2",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "12",
            "$width": "44",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#E75B5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "13",
            "$width": "63",
            "harmony": [
              {
                "root": {
                  "root-step": "C"
                },
                "kind": "minor",
                "$adagio-kind": "minor",
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "$type": "explicit",
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#265C5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "14",
            "$width": "51",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "A",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#265C5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#265C5C",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "15",
            "$width": "52",
            "harmony": [
              {
                "root": {
                  "root-step": "B",
                  "root-alter": "-1"
                },
                "kind": "major",
                "$adagio-kind": "major",
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "$type": "explicit",
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#4390E2",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#4390E2",
                "type": "quarter"
              }
            ],
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          },
          {
            "$number": "16",
            "$width": "45",
            "harmony": [
              {
                "$default-y": "39",
                "root": {
                  "root-step": "E",
                  "root-alter": "-1"
                },
                "kind": {
                  "content": "major",
                  "$halign": "center",
                  "$text": ""
                },
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 2
                },
                "staff": "1",
                "$placement": "above",
                "noteBefore": -1
              }
            ],
            "note": [
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 0
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 2
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 4
                },
                "$color": "#E75B5C",
                "type": "quarter"
              },
              {
                "rest": {},
                "duration": "2",
                "$adagio-location": {
                  "timePos": 6
                },
                "$color": "#E75B5C",
                "type": "quarter"
              }
            ],
            "barline": {
              "$location": "right",
              "bar-style": "light-heavy",
              "$adagio-location": {
                "timePos": 8,
                "dpq": 2
              },
              "noteBefore": 3
            },
            "attributes": [
              {
                "$adagio-time": {
                  "beats": "4",
                  "beat-type": "4"
                },
                "noteBefore": -1,
                "$adagio-location": {
                  "timePos": 0,
                  "dpq": 1
                }
              }
            ],
            "$adagio-restsInsideBeams": false,
            "$adagio-beatsList": [
              1,
              1,
              1,
              1
            ]
          }
        ],
        "uuid": "b6e5faf5-e2d7-b2ab-0eaf-f6b5b8467ca8"
      }
    ],
    "measure-list": {
      "score-measure": [
        {
          "uuid": "09e1557e-c84c-90f3-bc12-88fbdb31fd5e"
        },
        {
          "uuid": "8877cbde-0786-34a9-7ab2-bbeab81d7f8a"
        },
        {
          "uuid": "021a0181-4919-0be6-a4cb-ffdf3588bbb0"
        },
        {
          "uuid": "82a58227-7f71-ad90-7f7c-f5057e64cefc"
        },
        {
          "uuid": "00c6ca03-4d14-2e67-6a25-844f605c708e"
        },
        {
          "uuid": "b1acc977-a545-b2e9-15f8-2c0230d91100"
        },
        {
          "uuid": "0bd0a05d-0b97-d661-6478-fec8ed2be305"
        },
        {
          "uuid": "bf46866c-aece-a3f9-9702-d70d5939aac1"
        },
        {
          "uuid": "a6dce6d1-6677-6333-833f-0e8764384902"
        },
        {
          "uuid": "1eeb47f3-c65d-9979-bb17-e0c73c774e82"
        },
        {
          "uuid": "1058e12e-a8c5-4f09-deff-94dc1a34e1c2"
        },
        {
          "uuid": "9b8596be-3d62-8d79-c878-ccdd88955afb"
        },
        {
          "uuid": "4ef9641c-f53f-7266-361b-b11b77133968"
        },
        {
          "uuid": "70ded463-98b0-2f3e-990d-a4e27a289cf7"
        },
        {
          "uuid": "e651000a-d725-1296-9cec-e55b414ea215"
        },
        {
          "uuid": "7db8c140-f73f-7197-41b5-9596918bf44e"
        }
      ]
    },
    "$adagio-formatVersion": 59,
    "work": {
      "work-title": "Freedom 2040: The Tomorrow We'll Build Melody - Concert Pitch TC"
    }
  }
  }

  function notesFromJSON(json) {
    // score-partwise.part[0].measure[0].note[0].pitch.step
    let notes = [];
    for (let part of json['score-partwise']['part']) {
      for (let measure of part['measure']) {
        for (let note of measure['note']) {
          notes.push(note);
        }
      }
    }
    console.log('notes', notes);
    return notes;
  }

  function blocklyNoteFromMusicXMLNote(note) {

    console.log('note', note);
    if (note.rest) {
      return REST_STR;
    }
    const pitch = note.pitch;
    return `${pitch.step}${pitch.octave}`
  }

  function handlePlay(event) {
    loadWorkspace(event.target);
    let code = javascript.javascriptGenerator.workspaceToCode(
      Blockly.getMainWorkspace(),
    );
    code += 'MusicMaker.play();';
    // Eval can be dangerous. For more controlled execution, check
    // https://github.com/NeilFraser/JS-Interpreter.
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function loadWorkspace(button) {
    const workspace = Blockly.getMainWorkspace();

    if (button.blocklySave) {
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    } else {
      workspace.clear();
    }
    return workspace;
  }

  function save(button) {
    button.blocklySave = Blockly.serialization.workspaces.save(
      Blockly.getMainWorkspace(),
    );
  }

  function handleSave() {
    document.body.setAttribute('mode', 'edit');
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute('mode', 'edit');
    document.querySelectorAll('.button').forEach((btn) => {
      btn.removeEventListener('click', handlePlay);
      btn.addEventListener('click', enableBlocklyMode);
    });
  }

  function enableMakerMode() {
    document.body.setAttribute('mode', 'maker');
    document.querySelectorAll('.button').forEach((btn) => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }

  function newBlocklyBlockForNote(currWork, noteString) { // e.g. "C4"
    if (noteString === REST_STR) {
      return undefined;
    }
    const newB = currWork.newBlock('play_sound', null); // FIXME? why is this null?
    newB.setFieldValue(`sounds/${noteString}.m4a`, 'VALUE');
    newB.initSvg();
    return newB;
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
    const currWork = loadWorkspace(currentButton);
    if (currentButton.innerText === '1') {
      console.log('loading workspace 1');
      const xmlNotes = notesFromJSON(exampleMusicXMLJSON);
      const blocklyNotes = xmlNotes.map(blocklyNoteFromMusicXMLNote);
      console.log('blocklyNotes', blocklyNotes);
      const allNotesFromScore = blocklyNotes.map(note => newBlocklyBlockForNote(currWork, note)).filter(n=> n !== undefined);
      allNotesFromScore.forEach((note, i) => {
        if (i > 0) {
          const prevNote = allNotesFromScore[i - 1];
          prevNote.nextConnection.connect(note.previousConnection);
          prevNote.initSvg();
        }
      })

      // newBlocklyBlockForNote(currWork, 'E4');
      // newBlocklyBlockForNote(currWork, 'D4');
      // // const newB = currWork.newBlock('play_sound', null);
      // // // newB.setFieldValue('D4', 'VALUE');
      // // newB.setFieldValue('sounds/c2.m4a', 'VALUE');
      // // const newB2 = currWork.newBlock('play_sound', null);
      // // newB2.setFieldValue('sounds/b8.m4a', 'VALUE');
      // // // var result = workspace.newBlock('praxly_compare_block');
      // // // result.getInput('A_OPERAND').connection.connect(a?.outputConnection);
      // // // result.getInput('B_OPERAND').connection.connect(b?.outputConnection);
      // // // result.setFieldValue(node.type, "OPERATOR");

      // // newB.initSvg();
      // // newB2.initSvg(); // TODO: why aren't these connected? https://github.com/JMU-CS/praxly/blob/main/src/tree2blocks.js#L90
      // // // console.log(Blockly.serialization.blocks.save(currentButton));
    }
  }

  document.querySelector('#edit').addEventListener('click', enableEditMode);
  document.querySelector('#done').addEventListener('click', enableMakerMode);
  document.querySelector('#save').addEventListener('click', handleSave);

  enableMakerMode();

  const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
      {
        kind: 'block',
        type: 'controls_repeat_ext',
        inputs: {
          TIMES: {
            shadow: {
              type: 'math_number',
              fields: {
                NUM: 5,
              },
            },
          },
        },
      },
      {
        kind: 'block',
        type: 'play_sound',
      },
    ],
  };

  Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: false,
    horizontalLayout: true,
    toolboxPosition: 'end',
  });
})();
