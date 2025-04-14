import { useCallback, useEffect, useRef, useState } from 'react';
// import { BlocklyWorkspace } from 'react-blockly';
import BlocklyWorkspace from './BlocklyWorkspace';
// Old Functions
import { buildToolBox, notesFromJSON, blocklyNoteFromMusicXMLNote, newBlocklyBlockForNote, extractMeasures, recreateMusicJSON } from './blockly-setup';

// New Functions
import { generateBlocklyJson, convertFlatJsonToMeasures, updateFlatJsonNotes, parseBlocklyJSON, validFlatJSON } from './BlocklyJsonFunctions.js';
import * as Blockly from "blockly";



function changeBlocks(workspace, json) {
  // console.log("changeBlocks");
  try {
    workspace.clear();
  } catch(cantClearWorkspace) {
    console.error('proceeding despite error', cantClearWorkspace)
  }
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
  console.log("composition blocks using this flatjson -->", flatJSON)
  // const [xml, setXml] = useState('');
  const [blocklyJSON, setBlocklyJSON] = useState({});
  // useEffect(() => {setBlocklyJSON(flatToBlockly(flatJSON))}, [flatJSON])
  const [renders, setRenders] = useState(0);
  const ws = useRef();

  const renderedXMLRef = useRef(null);

  // const onInject = useCallback((workspace)=>{
  //   changeBlocks(workspace, flatJSON);
  // },[flatJSON])


  // onInject assumes the current score info has been passed to this component via its flatJSON prop
  // then it gets a list of measures (which each have a list of notes)
  // then via generateBlocklyJson it creates the blocklyJSON for these flat measures/objects
  const onInject = useCallback((workspace) => {
    ws.current = workspace;
    // NEW 3/27
    // const measures = convertFlatJsonToMeasures(flatJSON);
    // console.log("NEW measures: ", measures);
    // const blocks = generateBlocklyJson(measures);
    // console.log("NEW blocks: ", blocks);
    // Blockly.defineBlocksWithJsonArray(blocks);
    changeBlocks(workspace, flatJSON);

  }, [flatJSON])


  const [toolbox, setToolbox] = useState({});
  useEffect(() => {
    setToolbox(buildToolBox())
  }, []);

  useEffect(() => {
    console.log('noticed change to flatJSON prop')
    if (ws.current) {
      const beforeUpdate = Blockly.serialization.workspaces.save(ws.current)
      console.log('beforeUpdate', parseBlocklyJSON(beforeUpdate))
      console.log('flatJSON', convertFlatJsonToMeasures(flatJSON))
    
      // FIXME: notice that the measures in beforeUpdate and those in flatJSON differ, so indeed call changeBlocks
      if (JSON.stringify(parseBlocklyJSON(beforeUpdate)) !== JSON.stringify(convertFlatJsonToMeasures(flatJSON))) {
        changeBlocks(ws.current, flatJSON)
      }
    }
  }, [flatJSON])

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
    // onXmlChange={willSetXml}
    // call component with new blockly json
    onJsonChange={(Json) => {
      console.log("OnJsonChange --> Blockly", Json); // json is in blockyljson format
      // NEW 3/27
      let measures = parseBlocklyJSON(Json);
      let updatedFlatJson = updateFlatJsonNotes(flatJSON, measures); //new flatJSON with the changes incorporated

      // can we do a logical comparison of the prop json vs the current json
      console.log("FlatJSON: ", convertFlatJsonToMeasures(flatJSON))
      console.log("Updated FlatJSON: ", measures)
      console.log('updatedFlatJson', updatedFlatJson)
      // if the json is bad, don't update (yet)
      if (validFlatJSON(updatedFlatJson) &&
        JSON.stringify(convertFlatJsonToMeasures(flatJSON)) !==
        JSON.stringify(measures)
      ) {
        onChange(updatedFlatJson);
      } else {
        console.log('Skipped update bc invalid json')
        console.log("valid check: ", validFlatJSON(updatedFlatJson))
        console.log("Comparison: flat array != update array", JSON.stringify(convertFlatJsonToMeasures(flatJSON)) !==
        JSON.stringify(measures))

      }
    }}
    // changeBlocks = {{}}
    className="fill-height"
    // updateJson={blocklyJSON}
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