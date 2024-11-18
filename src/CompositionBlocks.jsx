import { useEffect, useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { buildToolBox, newBlocklyBlockForNote, notesFromJSON } from './blockly-setup';


export default function CompositionBlocks({flatJSON}) {
  const [xml, setXml] = useState('');

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

  return (
    <div className='split-container'>
      {toolbox.contents && <BlocklyWorkspace
        toolboxConfiguration={toolbox} // this must be a JSON toolbox definition
        initialXml={xml}
        // onXmlChange={setXml} 
        onXmlChange={(newXml) => {
          console.log("XML Updated:", newXml); // Log the updated XML
          setXml(newXml); // Update the state
        }}
        
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
          const xmlNotes = notesFromJSON(flatJSON);
          const allNotesFromScore = xmlNotes.map(note => newBlocklyBlockForNote(workspace, note)).filter(n => n !== undefined);
          allNotesFromScore.forEach((note, i) => {
            if (i > 0) {
              const prevNote = allNotesFromScore[i - 1];
              prevNote.nextConnection.connect(note.previousConnection);
              prevNote.initSvg();
            }
          })
        }}
      />}
      {xml && <pre>{xml}</pre>}
    </div>
  )
}