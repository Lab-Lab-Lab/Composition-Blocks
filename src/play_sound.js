import * as Blockly from 'blockly/core';

const REST_STR = 'rest'
const MIN_OCTAVE = 2; // from double bass, see: https://en.wikipedia.org/wiki/Double_bass#Pitch
const MAX_OCTAVE = 8; // from double bass, see: https://en.wikipedia.org/wiki/Piccolo
const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const NOTE_VALUES = [];

// Notes 11/13
// npm install 
// package.json
// Script section will make you aware of commands
// npm run dev
// o -> enter to open

// Either parse xml
// or when block created: log something and create from that log

// measure problem
// flatIO needs measures, create measure block?



for (let i = MIN_OCTAVE; i <= MAX_OCTAVE; i++) {
  for (let j = 0; j < NOTES.length; j++) {
    NOTE_VALUES.push(NOTES[j] + i);
  }
}

const PLAY_DURATION_OPTIONS = ['whole', 'half', 'quarter', 'eighth'].map((duration) => [duration, duration]);
const PLAY_OCTAVE_OPTIONS = ['2', '3', '4', '5', '6', '7', '8', 'rest'].map((octave) => [octave, octave]);
const PLAY_STEP_OPTIONS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'rest'].map((step) => [step, step]);

const MCPR_TOOLBOX = [
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
        type: 'field_dropdown',
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
];
Blockly.defineBlocksWithJsonArray(MCPR_TOOLBOX);