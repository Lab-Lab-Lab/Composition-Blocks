import { useEffect, useRef, useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { buildToolBox, newBlocklyBlockForNote, notesFromJSON } from './blockly-setup';


export default function CompositionBlocks({ flatJSON }) {
  const [xml, setXml] = useState('');
  const renderedXMLRef = useRef(null);

  {/* 
  <block type="play_sound" id="^0e.A?Vv^Un2_z|ves)K" x="0" y="0">
  <field name="DURATION">quarter</field>
  <field name="STEP">F</field>
  <field name="OCTAVE">5</field>
  <next>
    <block type="play_sound" id="@Y2|vh0RBlV:3HAJ8oSP"><
  field name="DURATION">quarter</field><field name="STEP">B</field><field name="OCTAVE">4</field><next><block type="play_sound" id="bybO-9o%tEVjns!qZqDx"><field name="DURATION">quarter</field><field name="STEP">B</field><field name="OCTAVE">4</field><next><block type="play_sound" id="(P.daZ`-]?=k{B%X@T]J"><field name="DURATION">quarter</field><field name="STEP">C</field><field name="OCTAVE">5</field><next><block type="play_sound" id="_W_}[O$Lfy2${uwkuS@g"><field name="DURATION">quarter</field><field name="STEP">G</field><field name="OCTAVE">4</field><next><block type="play_sound" id="M.iaNZPgiz5*VbF4^_C-"><field name="DURATION">quarter</field><field n */}

  const willSetXml = (newXml) => {
    console.log('willSetXml', newXml);
    console.log('current ref value', renderedXMLRef.current);

    const allBlocks = document.evaluate("//block",
      document,
      null,
      XPathResult.ANY_TYPE,
      null,
    )
    console.log('allBlocks', allBlocks);
    for (let thisBlock = allBlocks.iterateNext(); thisBlock; thisBlock = allBlocks.iterateNext()) {
      // console.log('thisBlock', thisBlock);
      // console.log('thisBlock', thisBlock.getAttribute('type'));
      console.log(`${thisBlock.getAttribute('type')}`);
      for (let child of thisBlock.children) {
        if (child.tagName === 'next') {
          continue;
        }
        // console.log('child', child);
        // console.log('child.getAttribute("name")', child.getAttribute("name"));
        // console.log('child.textContent', child.textContent);
        if (child.getAttribute("name"))
          console.log(`\t${child.getAttribute("name")} ${child.textContent}`);
      }
    }


    setXml(newXml);
  };

  const [toolbox, setToolbox] = useState({});
  useEffect(() => {
    setToolbox(buildToolBox())
  }, []);

  // change xml to JSON flatio: notes 11/18 
  // Blockly option:
  // - Instead of producing python or other code from xml use existing blockly tools to create JSON 
  //   - expand definition of block to know how to write flatio JSON in each instance of a block
  
  // Use straight XML:
  // - Use a parser to create data from the xml and then convert that data to flatIO JSON
  
  
  // use same the same JSON for everything else except:
  // each object will have one part with several measures:
  //   - use measure/group block to collect notes and then for each measure block, replace the 
  //   existing note array with the updated version
  // whenever anything is changed, we replace all measures and all notes within measures

  // return (
  //   <div>
  //     <div className='split-container'>
  //       {toolbox.contents && <BlocklyWorkspace
  //         toolboxConfiguration={toolbox} // this must be a JSON toolbox definition
  //         initialXml={xml}
  //         onXmlChange={willSetXml}
  //         className="fill-height"
  //         workspaceConfiguration={{
  //           grid: {
  //             spacing: 20,
  //             length: 3,
  //             colour: "#ccc",
  //             snap: true,
  //           },
  //         }}
  //         onInject={(workspace) => {
  //           const xmlNotes = notesFromJSON(flatJSON);
  //           const allNotesFromScore = xmlNotes.map(note => newBlocklyBlockForNote(workspace, note)).filter(n => n !== undefined);
  //           allNotesFromScore.forEach((note, i) => {
  //             if (i > 0) {
  //               const prevNote = allNotesFromScore[i - 1];
  //               prevNote.nextConnection.connect(note.previousConnection);
  //               prevNote.initSvg();
  //             }
  //           })
  //         }}
  //       />}
  //       {xml && <pre ref={renderedXMLRef} dangerouslySetInnerHTML={{ __html: xml }}></pre>}
  //     </div>
  //     {xml && <pre>{xml}</pre>}
  //   </div>
  // )
  return (
    <div>
      <div className='split-container'>
        {toolbox.contents && (
          <BlocklyWorkspace
            toolboxConfiguration={toolbox} // this must be a JSON toolbox definition
            initialXml={xml}
            onXmlChange={willSetXml}
            className="fill-height"
            workspaceConfiguration={{
              grid: {
                spacing: 20,
                length: 3,
                colour: "#ccc",
                snap: true,
              },
            }}
            onInject={(workspace) => {
              const measures = flatJSON['score-partwise']['part'][0]['measure']; // Extract measures from JSON
              
              // Initialize a dummy start block to connect all measure blocks to
              const startBlock = workspace.newBlock('measure');
              startBlock.initSvg();
              startBlock.moveBy(50, 0); // Adjust positioning as needed
              startBlock.render();

              let previousMeasureBlock = startBlock; // Use the dummy block as the starting reference

              measures.forEach((measure, measureIndex) => {
                // Create a measure block for each measure
                const measureBlock = workspace.newBlock('measure');
                measureBlock.initSvg();
                measureBlock.moveBy(50, measureIndex * 100); // Adjust positioning as needed

                console.log(`Created measure block ${measureIndex}`);

                // Process notes in this measure
                measure['note'].forEach(note => {
                  const noteBlock = newBlocklyBlockForNote(workspace, note);
                  if (noteBlock) {
                    const notesInput = measureBlock.getInput('NOTES');
                    if (notesInput && notesInput.connection && noteBlock.previousConnection) {
                      notesInput.connection.connect(noteBlock.previousConnection);
                    }
                  }
                });

                // Connect the current measure block to the previous one
                console.log(
                  `Connecting measure ${measureIndex} (previousConnection: ${
                    measureBlock.previousConnection ? 'exists' : 'null'
                  }) to previous block`
                );

                if (previousMeasureBlock.nextConnection && measureBlock.previousConnection) {
                  previousMeasureBlock.nextConnection.connect(measureBlock.previousConnection);
                  console.log(`Connected measure ${measureIndex - 1} to measure ${measureIndex}`);
                }

                // Render the measure block
                measureBlock.render();
                previousMeasureBlock = measureBlock; // Update for the next measure
              });
            }}
          />
        )}
        {xml && <pre ref={renderedXMLRef} dangerouslySetInnerHTML={{ __html: xml }}></pre>}
      </div>
      {xml && <pre>{xml}</pre>}
    </div>
  );
}