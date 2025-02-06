import exampleMusicXMLJSON from './example.js';

console.log(exampleMusicXMLJSON);

// Function to extract measure blocks from the XML string
function extractMeasures(xmlDoc) {
    let measureBlocks = xmlDoc.getElementsByTagName("block"); // Get all <block> elements from input
    let extractedMeasures = [];

    // Function to process a single measure block
    function processMeasure(measureBlock) {
        if (measureBlock.getAttribute("type") !== "measure") return null; // change/remove this if adding more blocks?

        let measure = { note: [] };
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

        return measure; // Return processed measure
    }

    // Loop through all measure blocks and extract data
    for (let block of measureBlocks) {
        let measure = processMeasure(block);
        if (measure) extractedMeasures.push(measure);
    }

    return extractedMeasures; // Return extracted measures
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
            existingMeasures[i].note = newMeasures[i].note; // Update existing measure notes
        } else {
            existingMeasures.push(newMeasures[i]); // Add new measure if it doesn't exist
        }
    }

    // Remove extra measures if necessary
    if (existingMeasures.length > newMeasures.length) {
        existingMeasures.length = newMeasures.length; // Trim array to match new data
    }

    return updatedJSON; // Return updated JSON
}

// Sample XML input string
const xmlInput = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="measure" id="xgDH!0F-1Q|=AxD1N+3X" x="50" y="0">
    <statement name="NOTES">
      <block type="play_sound" id="vY[0lYK*k|EYpQ~:bpnr">
        <field name="DURATION">whole</field>
        <field name="STEP">G</field>
        <field name="OCTAVE">5</field>
        <next>
          <block type="play_sound" id="@|i_~Z\`Jb3yCahwJcmUy">
            <field name="DURATION">half</field>
            <field name="STEP">C</field>
            <field name="OCTAVE">2</field>
            <next>
              <block type="play_sound" id="DDuHNqz}p[M)#fNZck2}">
                <field name="DURATION">quarter</field>
                <field name="STEP">E</field>
                <field name="OCTAVE">7</field>
                <next>
                  <block type="play_sound" id=":9DPS9+IWIFPOIo|PShH">
                    <field name="DURATION">eighth</field>
                    <field name="STEP">A</field>
                    <field name="OCTAVE">4</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <next>
      <block type="measure" id="u}Ofn7*i_k^/Vcj7=q9l">
        <statement name="NOTES">
          <block type="play_sound" id="FqeqJ9O1*WR?LuUV5asR">
            <field name="DURATION">whole</field>
            <field name="STEP">G</field>
            <field name="OCTAVE">5</field>
            <next>
              <block type="play_sound" id="kL:(,_{xK=#c0f^Lhkco">
                <field name="DURATION">half</field>
                <field name="STEP">C</field>
                <field name="OCTAVE">2</field>
                <next>
                  <block type="play_sound" id="9:nkr~scB([;CWEyT-r,">
                    <field name="DURATION">quarter</field>
                    <field name="STEP">E</field>
                    <field name="OCTAVE">7</field>
                    <next>
                      <block type="play_sound" id="}V;rfP+oLkP@ny8ZK{GM">
                        <field name="DURATION">quarter</field>
                        <field name="STEP">A</field>
                        <field name="OCTAVE">4</field>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="measure" id="84@Z6~FP1L8eX_j5wo%E">
            <statement name="NOTES">
              <block type="play_sound" id="ZJX{fzXna(#bf:6J}goA">
                <field name="DURATION">whole</field>
                <field name="STEP">C</field>
                <field name="OCTAVE">2</field>
                <next>
                  <block type="play_sound" id="RdmN|Z88(,he0q;*P]6P">
                    <field name="DURATION">whole</field>
                    <field name="STEP">C</field>
                    <field name="OCTAVE">2</field>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
`;

export {
    recreateMusicJSON
}

const updatedJSON = recreateMusicJSON(xmlInput, exampleMusicXMLJSON);
console.log(updatedJSON);
