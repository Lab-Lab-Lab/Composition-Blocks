import { useCallback, useEffect, useRef, useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { buildToolBox, notesFromJSON, blocklyNoteFromMusicXMLNote, newBlocklyBlockForNote, extractMeasures, recreateMusicJSON } from './blockly-setup';


function changeBlocks(workspace, json) {
  console.log("changeBlocks");
  const measures = json['score-partwise']['part'][0]['measure']; // Extract measures from JSON
      // console.log("measures", measures)
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
}

export default function CompositionBlocks({ flatJSON, onChange }) {
  console.log("composition blocks", flatJSON) 
  const [xml, setXml] = useState('');
  const renderedXMLRef = useRef(null);
  const onInject = useCallback((workspace)=>{
    changeBlocks(workspace, flatJSON);
  },[flatJSON])

  // const willSetXml = (newXml) => {
  //   console.log('willSetXml', newXml);
  //   console.log('current ref value', renderedXMLRef.current);

  //   setXml(newXml);
  // rip out the score make it work with the flatJSON

  // };

  const willSetXml = (newXml) => {
    console.log('Updated XML', newXml);
    setXml(newXml);

    // Update JSON with the new measures
    const updatedJSON = recreateMusicJSON(newXml, flatJSON);
    console.log("Composition Blocks --> Updated JSON:", updatedJSON);
    onChange(updatedJSON);

    // 2-27
    setXml(newXml);        // This needs to go **AFTER** onChange()

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

  return flatJSON && toolbox.contents && (<BlocklyWorkspace
    toolboxConfiguration={toolbox} // this must be a JSON toolbox definition
    onXmlChange={willSetXml}
    // changeBlocks = {{}}
    className="fill-height"
    workspaceConfiguration={{
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
    }}
    onInject={onInject}
  />)
};