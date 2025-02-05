import exampleMusicXMLJSON from './example.js';  // Use default import

console.log(exampleMusicXMLJSON);  // Verify if data loads correctly


function recreateMusicJSON(xmlString, originalJSON) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const measureBlocks = xmlDoc.getElementsByTagName("block");
    const newMeasures = [];

    for (let measureBlock of measureBlocks) {
        if (measureBlock.getAttribute("type") === "measure") {
            const measure = { note: [] };

            const notesStatement = measureBlock.getElementsByTagName("statement")[0];
            if (notesStatement) {
                let noteBlock = notesStatement.getElementsByTagName("block")[0];

                // Traverse through the linked notes using the <next> tag
                const extractedNotes = [];  // Store notes before pushing

                while (noteBlock) {
                    if (noteBlock.getAttribute("type") === "play_sound") {
                        let noteData = {}; // Create a new object for each note

                        // Use :scope > field to get only direct child fields.
                        const fields = noteBlock.querySelectorAll(":scope > field");

                        for (let field of fields) {
                            const name = field.getAttribute("name").toLowerCase();
                            noteData[name] = field.textContent;
                        }

                        // Push each note into an array (before reversing)
                        extractedNotes.push({
                            staff: "1",
                            voice: "1",
                            duration: noteData.duration === "quarter" ? "1" :
                                      noteData.duration === "half" ? "2" :
                                      noteData.duration === "whole" ? "4" : "1",
                            pitch: { octave: noteData.octave, step: noteData.step },
                            type: noteData.duration
                        });

                        console.log("Extracted Note:", noteData); // Debugging
                    }

                    // Move to the next note in the <next> chain
                    let nextElement = noteBlock.querySelector(":scope > next");
                    noteBlock = nextElement ? nextElement.querySelector(":scope > block") : null;
                }

                // Reverse the extracted notes to correct order
                measure.note = extractedNotes.reverse();
            }

            newMeasures.push(measure);
        }
    }

    // Clone the original JSON to avoid modifying the input object
    let updatedJSON = JSON.parse(JSON.stringify(originalJSON));

    // Ensure existing structure is maintained
    if (
        updatedJSON["score-partwise"] &&
        updatedJSON["score-partwise"]["part"] &&
        updatedJSON["score-partwise"]["part"][0]
    ) {
        const existingMeasures = updatedJSON["score-partwise"]["part"][0]["measure"];

        // Replace only the `note` section inside each measure
        for (let i = 0; i < newMeasures.length; i++) {
            if (existingMeasures[i]) {
                existingMeasures[i].note = newMeasures[i].note; // Preserve other properties
            } else {
                existingMeasures.push(newMeasures[i]); // If new measure, add it
            }
        }
    } else {
        console.error("Unexpected JSON format - missing 'part' structure.");
    }

    return updatedJSON;
}


const xmlInput = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="measure" id="UTn;qP#4#{YAi?)HjlsL" x="50" y="0">
    <statement name="NOTES">
      <block type="play_sound" id="N)n_$t[ZH9lXk915i}z*">
        <field name="DURATION">quarter</field>
        <field name="STEP">C</field>
        <field name="OCTAVE">5</field>
        <next>
          <block type="play_sound" id="ha/X\`x6Q$;Fl{QnmESul">
            <field name="DURATION">quarter</field>
            <field name="STEP">B</field>
            <field name="OCTAVE">4</field>
            <next>
              <block type="play_sound" id="~8{[~kax{OnU!HBEGfQc">
                <field name="DURATION">quarter</field>
                <field name="STEP">B</field>
                <field name="OCTAVE">4</field>
                <next>
                  <block type="play_sound" id="~)M)*?p)tyt}g6saLkdp">
                    <field name="DURATION">quarter</field>
                    <field name="STEP">D</field>
                    <field name="OCTAVE">5</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <next>
      <block type="measure" id="S+,gdjR[H/|Inu7/{M?O">
        <statement name="NOTES">
          <block type="play_sound" id="^7,\`C9R(e0ye-+WI?vfZ">
            <field name="DURATION">quarter</field>
            <field name="STEP">rest</field>
            <field name="OCTAVE">rest</field>
            <next>
              <block type="play_sound" id=".UoILh^+c\`)EhuEz@.w?">
                <field name="DURATION">quarter</field>
                <field name="STEP">B</field>
                <field name="OCTAVE">4</field>
                <next>
                  <block type="play_sound" id="UR9x94+%GHn%I6)tqyL$">
                    <field name="DURATION">quarter</field>
                    <field name="STEP">B</field>
                    <field name="OCTAVE">4</field>
                    <next>
                      <block type="play_sound" id="bphOGFC:|-sTz._DEg[l">
                        <field name="DURATION">quarter</field>
                        <field name="STEP">G</field>
                        <field name="OCTAVE">4</field>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
`;




const updatedJSON = recreateMusicJSON(xmlInput, exampleMusicXMLJSON);
// console.log(JSON.stringify(updatedJSON, null, 2));  // Pretty-print the output
console.log(updatedJSON)

