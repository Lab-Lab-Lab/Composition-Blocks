import './play_sound';
const REST_STR = 'rest';

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

// function buildToolBox() {



//   const JSONToolbox = {
//     kind: 'categoryToolbox',
//     contents: [
//       {
//         kind: 'category', name: 'Notes', colour: 210, contents: [
//           { kind: 'block', type: 'play_sound' },
//         ]
//       },
//     ],
//   };
//   console.log('JSONToolbox', JSONToolbox);
//   return JSONToolbox;
// };
function buildToolBox() {
  const JSONToolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Notes',
        colour: 210,
        contents: [
          { kind: 'block', type: 'play_sound' },
          { kind: 'block', type: 'measure' }, // Add the measure block here
        ],
      },
    ],
  };
  console.log('JSONToolbox', JSONToolbox);
  return JSONToolbox;
}


// function newBlocklyBlockForNote(currWork, noteObj) { // e.g. "C4"
//   const duration = noteObj.type;
//   const noteString = blocklyNoteFromMusicXMLNote(noteObj);
//   const newB = currWork.newBlock('play_sound', null); // FIXME? why is this null?
//   if (noteString === REST_STR) {
//     newB.setFieldValue('rest', 'STEP');
//     newB.setFieldValue('rest', 'OCTAVE');
//   } else {
//     newB.setFieldValue(noteObj.pitch.octave, 'OCTAVE');
//     newB.setFieldValue(noteObj.pitch.step, 'STEP');
//   }
//   newB.setFieldValue(duration, 'DURATION');


//   newB.initSvg();
//   return newB;
// }

function newBlocklyBlockForNote(currWork, noteObj) {
  const duration = noteObj.type;
  const noteString = blocklyNoteFromMusicXMLNote(noteObj);
  const newB = currWork.newBlock('play_sound', null);
  
  if (noteString === REST_STR) {
    newB.setFieldValue('rest', 'STEP');
    newB.setFieldValue('rest', 'OCTAVE');
  } else {
    newB.setFieldValue(noteObj.pitch.octave, 'OCTAVE');
    newB.setFieldValue(noteObj.pitch.step, 'STEP');
  }
  newB.setFieldValue(duration, 'DURATION');

  newB.initSvg();
  return newB;
}

function createBlocksFromJSON(workspace, json) {
  for (let part of json['score-partwise']['part']) {
    for (let measure of part['measure']) {
      // Create a new measure block
      const measureBlock = workspace.newBlock('measure');
      measureBlock.initSvg();
      
      for (let note of measure['note']) {
        // Create a play_sound block for each note
        const noteBlock = newBlocklyBlockForNote(workspace, note);

        // Connect the note block to the measure block
        measureBlock.getInput('NOTES').connection.connect(noteBlock.previousConnection);
      }

      // Position and finalize the measure block
      measureBlock.render();
    }
  }
}



export {
  buildToolBox,
  notesFromJSON,
  blocklyNoteFromMusicXMLNote,
  newBlocklyBlockForNote
}