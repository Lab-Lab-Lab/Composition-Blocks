/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const MIN_OCTAVE = 2; // from double bass, see: https://en.wikipedia.org/wiki/Double_bass#Pitch
const MAX_OCTAVE = 8; // from double bass, see: https://en.wikipedia.org/wiki/Piccolo
const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NOTE_VALUES = []; 



for (let i = MIN_OCTAVE; i <= MAX_OCTAVE; i++) {
  for (let j = 0; j < NOTES.length; j++) {
    NOTE_VALUES.push(NOTES[j] + i);
  }
}

// console.log('NOTES', NOTES);
// console.log('NOTE_VALUES', NOTE_VALUES);

// const PLAY_SOUND_OPTIONS = NOTE_VALUES.map((note) => [note, 'sounds/' + note + '.m4a']);
// PLAY_SOUND_OPTIONS.push(['rest', 'null']);
const PLAY_DURATION_OPTIONS = ['whole', 'half', 'quarter', 'eighth'].map((duration) => [duration, duration]);
const PLAY_OCTAVE_OPTIONS = ['2', '3', '4', '5', '6', '7', '8', 'rest'].map((octave) => [octave, octave]);
const PLAY_STEP_OPTIONS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'rest'].map((step) => [step, step]);

// "note": [
//  {
//  "staff": "1",
//  "voice": "1",
//  "duration": "2",
//  "pitch": {
//      "octave": "5",
//      "step": "D"
//  },
//  "$adagio-location": {
//     "timePos": 0
//   },
//   "type": "quarter",
//   "$color": "#E75B5C"
//   },

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: 'play_sound',
    message0: 'Duration: %1 Step: %2 Octave: %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'DURATION',
        options: PLAY_DURATION_OPTIONS,
      },
      {
        type:'field_dropdown',
        name: 'STEP',
        options: PLAY_STEP_OPTIONS,
      },
      {
        type: 'field_dropdown',
        name: 'OCTAVE',
        options: PLAY_OCTAVE_OPTIONS,
      }


    ],
    previousStatement: null,
    nextStatement: null,
    colour: 355,
  },
]);

javascript.javascriptGenerator.forBlock['play_sound'] = function (block) {
  const value = "'" + block.getFieldValue('VALUE') + "'";
  return 'MusicMaker.queueSound(' + value + ');\n';
};
