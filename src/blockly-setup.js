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
  // console.log('notes', notes);
  return notes;
}

function blocklyNoteFromMusicXMLNote(note) {

  // console.log('note', note);
  if (note.rest) {
    return REST_STR;
  }
  const pitch = note.pitch;
  return `${pitch.step}${pitch.octave}`
}

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
  // console.log('JSONToolbox', JSONToolbox);
  return JSONToolbox;
}

function newBlocklyBlockForNote(currWork, noteObj) {
  const duration = noteObj.type;
  const noteString = blocklyNoteFromMusicXMLNote(noteObj);
  const newB = currWork.newBlock('play_sound', null); // FIXME? why is this null?
  
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
      const measureBlock = workspace.newBlock('measure');
      measureBlock.initSvg();
      
      for (let note of measure['note']) {
        const noteBlock = newBlocklyBlockForNote(workspace, note);
        measureBlock.getInput('NOTES').connection.connect(noteBlock.previousConnection);
      }

      measureBlock.render();
    }
  }
}

// Function to extract measure blocks from the XML string
function extractMeasures(xmlDoc) {
  let measureBlocks = xmlDoc.getElementsByTagName("block"); // Get all <block> elements from input
  let extractedMeasures = [];

  // Function to process a single measure block
  function processMeasure(measureBlock) {
      if (measureBlock.getAttribute("type") !== "measure") return null; // change/remove this if adding more blocks?

      let measure = { note: [
              {
                "rest": {},
                "voice": "1",
                "staff": "1",
                "duration": "4",
                "$adagio-location": {
                  "timePos": 1
                },
                "type": "whole"
              },
      ] };
      let notesStatement = measureBlock.getElementsByTagName("statement")[0]; // Find the NOTES statement inside measure

      if (notesStatement) {
          let noteBlock = notesStatement.getElementsByTagName("block")[0]; // Get the first note block inside the statement
          let extractedNotes = []; 

          // Traverse through the linked notes using the <next> tag
          while (noteBlock) {
              if (noteBlock.getAttribute("type") === "play_sound") { // Ensure the block is a play_sound type
                  let noteData = {}; // Object to store note properties
                  let fields = noteBlock.querySelectorAll(":scope > field"); // Get only direct child fields

                  for (let field of fields) {
                      noteData[field.getAttribute("name").toLowerCase()] = field.textContent; // Store note attributes
                  }

                  // Push formatted note data into extractedNotes array
                  extractedNotes.push({
                      staff: "1",
                      voice: "1",
                      duration: noteData.duration === "quarter" ? "1" :
                          noteData.duration === "half" ? "2" :
                              noteData.duration === "whole" ? "4" : "1",
                      pitch: { octave: noteData.octave, step: noteData.step },
                      type: noteData.duration
                  });
              }

              // Move to the next note in the <next> chain
              let nextElement = noteBlock.querySelector(":scope > next");
              noteBlock = nextElement ? nextElement.querySelector(":scope > block") : null;
          }

          measure.note = extractedNotes.reverse(); // Reverse extracted notes to maintain visual order
      }

      return measure;
  }

  // Loop through all measure blocks and extract data
  for (let block of measureBlocks) {
      let measure = processMeasure(block);
      if (measure) extractedMeasures.push(measure);
  }

  return extractedMeasures;
}

// Function to recreate JSON from updated XML
function recreateMusicJSON(xmlString, originalJSON) {
  const parser = new DOMParser(); // Create a new DOMParser instance
  const xmlDoc = parser.parseFromString(xmlString, "text/xml"); // Parse XML string into a document

  let newMeasures = extractMeasures(xmlDoc); // Extract measure data from the XML

  let updatedJSON = JSON.parse(JSON.stringify(originalJSON)); // Deep copy original JSON to avoid modifying input
  let existingMeasures = updatedJSON?.["score-partwise"]?.["part"]?.[0]?.["measure"] || []; // Locate the measures section in JSON

  // Update or add measures in the JSON
  for (let i = 0; i < newMeasures.length; i++) {
      if (existingMeasures[i]) {
          // existingMeasures[i].note = newMeasures[i].note; // Update existing measure notes
          // 2-27
          existingMeasures[i].note = newMeasures[i].note.map((note, index) => ({
            ...existingMeasures[i].note[index], // Preserve original fields like timepos
            ...note // Overwrite updated fields
          }));
          
      } else {
          existingMeasures.push(newMeasures[i]); // Add new measure if it doesn't exist
      }
  }

  // Remove extra measures if necessary
  if (existingMeasures.length > newMeasures.length) {
      existingMeasures.length = newMeasures.length; // Trim array to match new data
  }

  return updatedJSON;
}



export {
  buildToolBox,
  notesFromJSON,
  blocklyNoteFromMusicXMLNote,
  newBlocklyBlockForNote,
  extractMeasures,
  recreateMusicJSON
}