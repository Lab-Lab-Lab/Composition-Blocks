import { useEffect, useRef, useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { buildToolBox, newBlocklyBlockForNote, notesFromJSON } from './blockly-setup';



export default function CompositionBlocks({ flatJSON }) {
  const [xml, setXml] = useState('');
  const renderedXMLRef = useRef(null);


  const willSetXml = (newXml) => {
    console.log('willSetXml', newXml);
    console.log('current ref value', renderedXMLRef.current);


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

              // Initialize the first measure block directly (to prevent typeError)
              let previousMeasureBlock = null;

              measures.forEach((measure, measureIndex) => {
                // Create a measure block for each measure
                const measureBlock = workspace.newBlock('measure');
                measureBlock.initSvg();
                measureBlock.moveBy(50, measureIndex * 100); // Adjust positioning

                // console.log(`Created measure block ${measureIndex}`);

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
                if (previousMeasureBlock && previousMeasureBlock.nextConnection && measureBlock.previousConnection) {
                  previousMeasureBlock.nextConnection.connect(measureBlock.previousConnection);
                  // console.log(`Connected measure ${measureIndex - 1} to measure ${measureIndex}`);
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