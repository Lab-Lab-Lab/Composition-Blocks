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

console.log('NOTES', NOTES);
console.log('NOTE_VALUES', NOTE_VALUES);

const PLAY_SOUND_OPTIONS = NOTE_VALUES.map((note) => [note, 'sounds/' + note + '.m4a']);
PLAY_SOUND_OPTIONS.push(['rest', 'null']);
const PLAY_DURATION_OPTIONS = ['whole', 'half', 'quarter', 'eighth'].map((duration) => [duration, duration]);

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: 'play_sound',
    message0: 'Play %1 for %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'VALUE',
        options: PLAY_SOUND_OPTIONS,
      },
      {
        type: 'field_dropdown',
        name: 'DURATION',
        options: PLAY_DURATION_OPTIONS,
      },
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
